package prometheusutil

//go:generate env GOBIN=$PWD/.bin GO111MODULE=on go install github.com/efritz/go-mockgen
//go:generate $PWD/.bin/go-mockgen -f github.com/tetrafolium/sourcegraph/internal/prometheusutil -i PrometheusQuerier -o prometheus_mock.go
