package userpasswd

import (
	"github.com/tetrafolium/sourcegraph/cmd/frontend/auth/providers"
	"github.com/tetrafolium/sourcegraph/internal/conf"
)

// Watch for configuration changes related to the builtin auth provider.
func init() {
	go func() {
		conf.Watch(func() {
			newPC, _ := getProviderConfig()
			if newPC == nil {
				providers.Update("builtin", nil)
				return
			}
			providers.Update("builtin", []providers.Provider{&provider{c: newPC}})
		})
	}()
}
