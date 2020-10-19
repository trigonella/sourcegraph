package db

import "github.com/tetrafolium/sourcegraph/internal/db/dbtesting"

func init() {
	dbtesting.BeforeTest = append(dbtesting.BeforeTest, func() { Mocks = MockStores{} })
}
