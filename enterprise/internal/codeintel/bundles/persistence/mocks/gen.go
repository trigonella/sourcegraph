package mocks

//go:generate env GOBIN=$PWD/.bin GO111MODULE=on go install github.com/efritz/go-mockgen
//go:generate $PWD/.bin/go-mockgen -f github.com/tetrafolium/sourcegraph/enterprise/internal/codeintel/bundles/persistence -i Reader -o mock_reader.go
//go:generate $PWD/.bin/go-mockgen -f github.com/tetrafolium/sourcegraph/enterprise/internal/codeintel/bundles/persistence -i Writer -o mock_writer.go
