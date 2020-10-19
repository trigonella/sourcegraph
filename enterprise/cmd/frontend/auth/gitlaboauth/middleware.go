package gitlaboauth

import (
	"net/http"

	"github.com/tetrafolium/sourcegraph/cmd/frontend/auth"
	"github.com/tetrafolium/sourcegraph/enterprise/cmd/frontend/auth/oauth"
	"github.com/tetrafolium/sourcegraph/internal/extsvc"
	"github.com/tetrafolium/sourcegraph/schema"
)

const authPrefix = auth.AuthURLPrefix + "/gitlab"

func init() {
	oauth.AddIsOAuth(func(p schema.AuthProviders) bool {
		return p.Gitlab != nil
	})
}

var Middleware = &auth.Middleware{
	API: func(next http.Handler) http.Handler {
		return oauth.NewHandler(extsvc.TypeGitLab, authPrefix, true, next)
	},
	App: func(next http.Handler) http.Handler {
		return oauth.NewHandler(extsvc.TypeGitLab, authPrefix, false, next)
	},
}
