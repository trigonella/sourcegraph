package externallink

import (
	"github.com/tetrafolium/sourcegraph/cmd/frontend/backend"
	"github.com/tetrafolium/sourcegraph/internal/db"
	"github.com/tetrafolium/sourcegraph/internal/repoupdater"
)

func resetMocks() {
	repoupdater.MockRepoLookup = nil
	db.Mocks = db.MockStores{}
	backend.Mocks = backend.MockServices{}
}
