package main

import (
	"fmt"

	srccli "github.com/tetrafolium/sourcegraph/internal/src-cli"
)

func main() {
	fmt.Printf(srccli.MinimumVersion)
}
