package app

import "github.com/tetrafolium/sourcegraph/internal/txemail"

func init() {
	txemail.DisableSilently()
}
