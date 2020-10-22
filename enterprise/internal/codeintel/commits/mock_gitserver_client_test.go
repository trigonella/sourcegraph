// Code generated by github.com/efritz/go-mockgen 0.1.0; DO NOT EDIT.

package commits

import (
	"context"
	"sync"

	gitserver "github.com/tetrafolium/sourcegraph/enterprise/internal/codeintel/gitserver"
	store "github.com/tetrafolium/sourcegraph/enterprise/internal/codeintel/store"
)

// MockGitserverClient is a mock implementation of the gitserverClient
// interface (from the package
// github.com/tetrafolium/sourcegraph/enterprise/internal/codeintel/commits)
// used for unit testing.
type MockGitserverClient struct {
	// CommitGraphFunc is an instance of a mock function object controlling
	// the behavior of the method CommitGraph.
	CommitGraphFunc *GitserverClientCommitGraphFunc
	// HeadFunc is an instance of a mock function object controlling the
	// behavior of the method Head.
	HeadFunc *GitserverClientHeadFunc
}

// NewMockGitserverClient creates a new mock of the gitserverClient
// interface. All methods return zero values for all results, unless
// overwritten.
func NewMockGitserverClient() *MockGitserverClient {
	return &MockGitserverClient{
		CommitGraphFunc: &GitserverClientCommitGraphFunc{
			defaultHook: func(context.Context, store.Store, int, gitserver.CommitGraphOptions) (map[string][]string, error) {
				return nil, nil
			},
		},
		HeadFunc: &GitserverClientHeadFunc{
			defaultHook: func(context.Context, store.Store, int) (string, error) {
				return "", nil
			},
		},
	}
}

// surrogateMockGitserverClient is a copy of the gitserverClient interface
// (from the package
// github.com/tetrafolium/sourcegraph/enterprise/internal/codeintel/commits).
// It is redefined here as it is unexported in the source package.
type surrogateMockGitserverClient interface {
	CommitGraph(context.Context, store.Store, int, gitserver.CommitGraphOptions) (map[string][]string, error)
	Head(context.Context, store.Store, int) (string, error)
}

// NewMockGitserverClientFrom creates a new mock of the MockGitserverClient
// interface. All methods delegate to the given implementation, unless
// overwritten.
func NewMockGitserverClientFrom(i surrogateMockGitserverClient) *MockGitserverClient {
	return &MockGitserverClient{
		CommitGraphFunc: &GitserverClientCommitGraphFunc{
			defaultHook: i.CommitGraph,
		},
		HeadFunc: &GitserverClientHeadFunc{
			defaultHook: i.Head,
		},
	}
}

// GitserverClientCommitGraphFunc describes the behavior when the
// CommitGraph method of the parent MockGitserverClient instance is invoked.
type GitserverClientCommitGraphFunc struct {
	defaultHook func(context.Context, store.Store, int, gitserver.CommitGraphOptions) (map[string][]string, error)
	hooks       []func(context.Context, store.Store, int, gitserver.CommitGraphOptions) (map[string][]string, error)
	history     []GitserverClientCommitGraphFuncCall
	mutex       sync.Mutex
}

// CommitGraph delegates to the next hook function in the queue and stores
// the parameter and result values of this invocation.
func (m *MockGitserverClient) CommitGraph(v0 context.Context, v1 store.Store, v2 int, v3 gitserver.CommitGraphOptions) (map[string][]string, error) {
	r0, r1 := m.CommitGraphFunc.nextHook()(v0, v1, v2, v3)
	m.CommitGraphFunc.appendCall(GitserverClientCommitGraphFuncCall{v0, v1, v2, v3, r0, r1})
	return r0, r1
}

// SetDefaultHook sets function that is called when the CommitGraph method
// of the parent MockGitserverClient instance is invoked and the hook queue
// is empty.
func (f *GitserverClientCommitGraphFunc) SetDefaultHook(hook func(context.Context, store.Store, int, gitserver.CommitGraphOptions) (map[string][]string, error)) {
	f.defaultHook = hook
}

// PushHook adds a function to the end of hook queue. Each invocation of the
// CommitGraph method of the parent MockGitserverClient instance inovkes the
// hook at the front of the queue and discards it. After the queue is empty,
// the default hook function is invoked for any future action.
func (f *GitserverClientCommitGraphFunc) PushHook(hook func(context.Context, store.Store, int, gitserver.CommitGraphOptions) (map[string][]string, error)) {
	f.mutex.Lock()
	f.hooks = append(f.hooks, hook)
	f.mutex.Unlock()
}

// SetDefaultReturn calls SetDefaultDefaultHook with a function that returns
// the given values.
func (f *GitserverClientCommitGraphFunc) SetDefaultReturn(r0 map[string][]string, r1 error) {
	f.SetDefaultHook(func(context.Context, store.Store, int, gitserver.CommitGraphOptions) (map[string][]string, error) {
		return r0, r1
	})
}

// PushReturn calls PushDefaultHook with a function that returns the given
// values.
func (f *GitserverClientCommitGraphFunc) PushReturn(r0 map[string][]string, r1 error) {
	f.PushHook(func(context.Context, store.Store, int, gitserver.CommitGraphOptions) (map[string][]string, error) {
		return r0, r1
	})
}

func (f *GitserverClientCommitGraphFunc) nextHook() func(context.Context, store.Store, int, gitserver.CommitGraphOptions) (map[string][]string, error) {
	f.mutex.Lock()
	defer f.mutex.Unlock()

	if len(f.hooks) == 0 {
		return f.defaultHook
	}

	hook := f.hooks[0]
	f.hooks = f.hooks[1:]
	return hook
}

func (f *GitserverClientCommitGraphFunc) appendCall(r0 GitserverClientCommitGraphFuncCall) {
	f.mutex.Lock()
	f.history = append(f.history, r0)
	f.mutex.Unlock()
}

// History returns a sequence of GitserverClientCommitGraphFuncCall objects
// describing the invocations of this function.
func (f *GitserverClientCommitGraphFunc) History() []GitserverClientCommitGraphFuncCall {
	f.mutex.Lock()
	history := make([]GitserverClientCommitGraphFuncCall, len(f.history))
	copy(history, f.history)
	f.mutex.Unlock()

	return history
}

// GitserverClientCommitGraphFuncCall is an object that describes an
// invocation of method CommitGraph on an instance of MockGitserverClient.
type GitserverClientCommitGraphFuncCall struct {
	// Arg0 is the value of the 1st argument passed to this method
	// invocation.
	Arg0 context.Context
	// Arg1 is the value of the 2nd argument passed to this method
	// invocation.
	Arg1 store.Store
	// Arg2 is the value of the 3rd argument passed to this method
	// invocation.
	Arg2 int
	// Arg3 is the value of the 4th argument passed to this method
	// invocation.
	Arg3 gitserver.CommitGraphOptions
	// Result0 is the value of the 1st result returned from this method
	// invocation.
	Result0 map[string][]string
	// Result1 is the value of the 2nd result returned from this method
	// invocation.
	Result1 error
}

// Args returns an interface slice containing the arguments of this
// invocation.
func (c GitserverClientCommitGraphFuncCall) Args() []interface{} {
	return []interface{}{c.Arg0, c.Arg1, c.Arg2, c.Arg3}
}

// Results returns an interface slice containing the results of this
// invocation.
func (c GitserverClientCommitGraphFuncCall) Results() []interface{} {
	return []interface{}{c.Result0, c.Result1}
}

// GitserverClientHeadFunc describes the behavior when the Head method of
// the parent MockGitserverClient instance is invoked.
type GitserverClientHeadFunc struct {
	defaultHook func(context.Context, store.Store, int) (string, error)
	hooks       []func(context.Context, store.Store, int) (string, error)
	history     []GitserverClientHeadFuncCall
	mutex       sync.Mutex
}

// Head delegates to the next hook function in the queue and stores the
// parameter and result values of this invocation.
func (m *MockGitserverClient) Head(v0 context.Context, v1 store.Store, v2 int) (string, error) {
	r0, r1 := m.HeadFunc.nextHook()(v0, v1, v2)
	m.HeadFunc.appendCall(GitserverClientHeadFuncCall{v0, v1, v2, r0, r1})
	return r0, r1
}

// SetDefaultHook sets function that is called when the Head method of the
// parent MockGitserverClient instance is invoked and the hook queue is
// empty.
func (f *GitserverClientHeadFunc) SetDefaultHook(hook func(context.Context, store.Store, int) (string, error)) {
	f.defaultHook = hook
}

// PushHook adds a function to the end of hook queue. Each invocation of the
// Head method of the parent MockGitserverClient instance inovkes the hook
// at the front of the queue and discards it. After the queue is empty, the
// default hook function is invoked for any future action.
func (f *GitserverClientHeadFunc) PushHook(hook func(context.Context, store.Store, int) (string, error)) {
	f.mutex.Lock()
	f.hooks = append(f.hooks, hook)
	f.mutex.Unlock()
}

// SetDefaultReturn calls SetDefaultDefaultHook with a function that returns
// the given values.
func (f *GitserverClientHeadFunc) SetDefaultReturn(r0 string, r1 error) {
	f.SetDefaultHook(func(context.Context, store.Store, int) (string, error) {
		return r0, r1
	})
}

// PushReturn calls PushDefaultHook with a function that returns the given
// values.
func (f *GitserverClientHeadFunc) PushReturn(r0 string, r1 error) {
	f.PushHook(func(context.Context, store.Store, int) (string, error) {
		return r0, r1
	})
}

func (f *GitserverClientHeadFunc) nextHook() func(context.Context, store.Store, int) (string, error) {
	f.mutex.Lock()
	defer f.mutex.Unlock()

	if len(f.hooks) == 0 {
		return f.defaultHook
	}

	hook := f.hooks[0]
	f.hooks = f.hooks[1:]
	return hook
}

func (f *GitserverClientHeadFunc) appendCall(r0 GitserverClientHeadFuncCall) {
	f.mutex.Lock()
	f.history = append(f.history, r0)
	f.mutex.Unlock()
}

// History returns a sequence of GitserverClientHeadFuncCall objects
// describing the invocations of this function.
func (f *GitserverClientHeadFunc) History() []GitserverClientHeadFuncCall {
	f.mutex.Lock()
	history := make([]GitserverClientHeadFuncCall, len(f.history))
	copy(history, f.history)
	f.mutex.Unlock()

	return history
}

// GitserverClientHeadFuncCall is an object that describes an invocation of
// method Head on an instance of MockGitserverClient.
type GitserverClientHeadFuncCall struct {
	// Arg0 is the value of the 1st argument passed to this method
	// invocation.
	Arg0 context.Context
	// Arg1 is the value of the 2nd argument passed to this method
	// invocation.
	Arg1 store.Store
	// Arg2 is the value of the 3rd argument passed to this method
	// invocation.
	Arg2 int
	// Result0 is the value of the 1st result returned from this method
	// invocation.
	Result0 string
	// Result1 is the value of the 2nd result returned from this method
	// invocation.
	Result1 error
}

// Args returns an interface slice containing the arguments of this
// invocation.
func (c GitserverClientHeadFuncCall) Args() []interface{} {
	return []interface{}{c.Arg0, c.Arg1, c.Arg2}
}

// Results returns an interface slice containing the results of this
// invocation.
func (c GitserverClientHeadFuncCall) Results() []interface{} {
	return []interface{}{c.Result0, c.Result1}
}
