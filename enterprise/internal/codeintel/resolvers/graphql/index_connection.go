package graphql

import (
	"context"

	gql "github.com/tetrafolium/sourcegraph/cmd/frontend/graphqlbackend"
	"github.com/tetrafolium/sourcegraph/cmd/frontend/graphqlbackend/graphqlutil"
	"github.com/tetrafolium/sourcegraph/enterprise/internal/codeintel/resolvers"
)

type IndexConnectionResolver struct {
	resolver         *resolvers.IndexesResolver
	locationResolver *CachedLocationResolver
}

func NewIndexConnectionResolver(resolver *resolvers.IndexesResolver, locationResolver *CachedLocationResolver) gql.LSIFIndexConnectionResolver {
	return &IndexConnectionResolver{
		resolver:         resolver,
		locationResolver: locationResolver,
	}
}

func (r *IndexConnectionResolver) Nodes(ctx context.Context) ([]gql.LSIFIndexResolver, error) {
	if err := r.resolver.Resolve(ctx); err != nil {
		return nil, err
	}

	resolvers := make([]gql.LSIFIndexResolver, 0, len(r.resolver.Indexes))
	for i := range r.resolver.Indexes {
		resolvers = append(resolvers, NewIndexResolver(r.resolver.Indexes[i], r.locationResolver))
	}
	return resolvers, nil
}

func (r *IndexConnectionResolver) TotalCount(ctx context.Context) (*int32, error) {
	if err := r.resolver.Resolve(ctx); err != nil {
		return nil, err
	}
	return toInt32(&r.resolver.TotalCount), nil
}

func (r *IndexConnectionResolver) PageInfo(ctx context.Context) (*graphqlutil.PageInfo, error) {
	if err := r.resolver.Resolve(ctx); err != nil {
		return nil, err
	}
	return encodeIntCursor(toInt32(r.resolver.NextOffset)), nil
}
