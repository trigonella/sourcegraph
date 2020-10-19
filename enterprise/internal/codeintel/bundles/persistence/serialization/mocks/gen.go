package mocks

//go:generate env GOBIN=$PWD/.bin GO111MODULE=on go install github.com/efritz/go-mockgen
//go:generate $PWD/.bin/go-mockgen -f github.com/tetrafolium/sourcegraph/enterprise/internal/codeintel/bundles/persistence/serialization -i Serializer -o mock_serializer.go
