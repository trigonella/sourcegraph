package authz

import (
	"context"
	"time"

	"github.com/tetrafolium/sourcegraph/cmd/frontend/enterprise"
	eauthz "github.com/tetrafolium/sourcegraph/enterprise/cmd/frontend/authz"
	"github.com/tetrafolium/sourcegraph/enterprise/cmd/frontend/internal/authz/resolvers"
	eiauthz "github.com/tetrafolium/sourcegraph/enterprise/internal/authz"
	"github.com/tetrafolium/sourcegraph/internal/authz"
	"github.com/tetrafolium/sourcegraph/internal/conf"
	"github.com/tetrafolium/sourcegraph/internal/db"
	"github.com/tetrafolium/sourcegraph/internal/db/dbconn"
)

func Init(ctx context.Context, enterpriseServices *enterprise.Services) error {
	eauthz.Init(dbconn.Global, msResolutionClock)

	go func() {
		t := time.NewTicker(5 * time.Second)
		for range t.C {
			allowAccessByDefault, authzProviders, _, _ :=
				eiauthz.ProvidersFromConfig(ctx, conf.Get(), db.ExternalServices)
			authz.SetProviders(allowAccessByDefault, authzProviders)
		}
	}()

	enterpriseServices.AuthzResolver = resolvers.NewResolver(dbconn.Global, msResolutionClock)

	return nil
}

var msResolutionClock = func() time.Time { return time.Now().UTC().Truncate(time.Microsecond) }
