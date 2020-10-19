package resolvers

import (
	"context"
	"fmt"
	"testing"

	"github.com/google/go-cmp/cmp"
	"github.com/tetrafolium/sourcegraph/cmd/frontend/backend"
	"github.com/tetrafolium/sourcegraph/cmd/frontend/graphqlbackend"
	ee "github.com/tetrafolium/sourcegraph/enterprise/internal/campaigns"
	"github.com/tetrafolium/sourcegraph/enterprise/internal/campaigns/resolvers/apitest"
	"github.com/tetrafolium/sourcegraph/internal/campaigns"
	"github.com/tetrafolium/sourcegraph/internal/db/dbconn"
	"github.com/tetrafolium/sourcegraph/internal/db/dbtesting"
)

func TestCampaignResolver(t *testing.T) {
	if testing.Short() {
		t.Skip()
	}

	ctx := backend.WithAuthzBypass(context.Background())
	dbtesting.SetupGlobalTestDB(t)

	username := "campaign-resolver-username"
	userID := insertTestUser(t, dbconn.Global, username, true)

	store := ee.NewStore(dbconn.Global)

	campaign := &campaigns.Campaign{
		Name:            "my-unique-name",
		Description:     "The campaign description",
		NamespaceUserID: userID,
		AuthorID:        userID,
	}
	if err := store.CreateCampaign(ctx, campaign); err != nil {
		t.Fatal(err)
	}

	s, err := graphqlbackend.NewSchema(&Resolver{store: store}, nil, nil)
	if err != nil {
		t.Fatal(err)
	}

	campaignApiID := string(campaigns.MarshalCampaignID(campaign.ID))

	input := map[string]interface{}{"campaign": campaignApiID}
	var response struct{ Node apitest.Campaign }
	apitest.MustExec(ctx, t, s, input, &response, queryCampaign)

	wantCampaign := apitest.Campaign{
		ID:          campaignApiID,
		Name:        campaign.Name,
		Description: campaign.Description,
		Namespace:   apitest.UserOrg{DatabaseID: userID, SiteAdmin: true},
		Author:      apitest.User{DatabaseID: userID, SiteAdmin: true},
		URL:         fmt.Sprintf("/users/%s/campaigns/%s", username, campaignApiID),
	}
	if diff := cmp.Diff(wantCampaign, response.Node); diff != "" {
		t.Fatalf("wrong campaign response (-want +got):\n%s", diff)
	}
}

const queryCampaign = `
fragment u on User { databaseID, siteAdmin }
fragment o on Org  { name }

query($campaign: ID!){
  node(id: $campaign) {
    ... on Campaign {
      id, name, description
      author    { ...u }
      namespace {
        ... on User { ...u }
        ... on Org  { ...o }
      }
      url
    }
  }
}
`
