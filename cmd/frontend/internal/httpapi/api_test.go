package httpapi

import (
	"github.com/gorilla/mux"
	"github.com/tetrafolium/sourcegraph/cmd/frontend/enterprise"
	"github.com/tetrafolium/sourcegraph/cmd/frontend/internal/httpapi/router"
	"github.com/tetrafolium/sourcegraph/internal/httptestutil"
	"github.com/tetrafolium/sourcegraph/internal/txemail"
)

func init() {
	txemail.DisableSilently()
}

func newTest() *httptestutil.Client {
	enterpriseServices := enterprise.DefaultServices()

	return httptestutil.NewTest(NewHandler(
		router.New(mux.NewRouter()),
		nil,
		enterpriseServices.GitHubWebhook,
		enterpriseServices.GitLabWebhook,
		enterpriseServices.BitbucketServerWebhook,
		enterpriseServices.NewCodeIntelUploadHandler,
	))
}
