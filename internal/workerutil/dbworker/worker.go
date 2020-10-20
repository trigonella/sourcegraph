package dbworker

import (
	"context"

	"github.com/tetrafolium/sourcegraph/internal/workerutil"
	"github.com/tetrafolium/sourcegraph/internal/workerutil/dbworker/store"
)

func NewWorker(ctx context.Context, store store.Store, handler Handler, options workerutil.WorkerOptions) *workerutil.Worker {
	return workerutil.NewWorker(ctx, newStoreShim(store), newHandlerShim(handler), options)
}
