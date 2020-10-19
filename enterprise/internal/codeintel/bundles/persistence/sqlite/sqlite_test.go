package sqlite

import "github.com/tetrafolium/sourcegraph/internal/sqliteutil"

func init() {
	sqliteutil.SetLocalLibpath()
	sqliteutil.MustRegisterSqlite3WithPcre()
}
