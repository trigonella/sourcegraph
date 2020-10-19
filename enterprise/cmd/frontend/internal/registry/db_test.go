package registry

import "github.com/tetrafolium/sourcegraph/internal/db/dbtesting"

func init() {
	dbtesting.DBNameSuffix = "registry"
}
