package graphqlbackend

import (
	"github.com/tetrafolium/sourcegraph/cmd/frontend/backend"
	"github.com/tetrafolium/sourcegraph/internal/db"
)

func resetMocks() {
	db.Mocks = db.MockStores{}
	backend.Mocks = backend.MockServices{}
}
