package resetter

import (
	"time"

	"github.com/tetrafolium/sourcegraph/enterprise/internal/codeintel/store"
	"github.com/tetrafolium/sourcegraph/internal/workerutil/dbworker"
)

func NewIndexResetter(
	s store.Store,
	resetInterval time.Duration,
	metrics dbworker.ResetterMetrics,
) *dbworker.Resetter {
	return dbworker.NewResetter(store.WorkerutilIndexStore(s), dbworker.ResetterOptions{
		Name:     "index resetter",
		Interval: resetInterval,
		Metrics:  metrics,
	})
}
