package usagestats

import "github.com/tetrafolium/sourcegraph/internal/db/dbtesting"

func init() {
	dbtesting.DBNameSuffix = "usagestats"
}
