// Code generated by github.com/efritz/go-mockgen 0.1.0; DO NOT EDIT.

package indexer

import (
	"context"
	store "github.com/tetrafolium/sourcegraph/enterprise/internal/codeintel/store"
	"sync"
)

// MockProcessor is a mock implementation of the Processor interface (from
// the package
// github.com/tetrafolium/sourcegraph/enterprise/cmd/precise-code-intel-indexer/internal/indexer)
// used for unit testing.
type MockProcessor struct {
	// ProcessFunc is an instance of a mock function object controlling the
	// behavior of the method Process.
	ProcessFunc *ProcessorProcessFunc
}

// NewMockProcessor creates a new mock of the Processor interface. All
// methods return zero values for all results, unless overwritten.
func NewMockProcessor() *MockProcessor {
	return &MockProcessor{
		ProcessFunc: &ProcessorProcessFunc{
			defaultHook: func(context.Context, store.Index) error {
				return nil
			},
		},
	}
}

// NewMockProcessorFrom creates a new mock of the MockProcessor interface.
// All methods delegate to the given implementation, unless overwritten.
func NewMockProcessorFrom(i Processor) *MockProcessor {
	return &MockProcessor{
		ProcessFunc: &ProcessorProcessFunc{
			defaultHook: i.Process,
		},
	}
}

// ProcessorProcessFunc describes the behavior when the Process method of
// the parent MockProcessor instance is invoked.
type ProcessorProcessFunc struct {
	defaultHook func(context.Context, store.Index) error
	hooks       []func(context.Context, store.Index) error
	history     []ProcessorProcessFuncCall
	mutex       sync.Mutex
}

// Process delegates to the next hook function in the queue and stores the
// parameter and result values of this invocation.
func (m *MockProcessor) Process(v0 context.Context, v1 store.Index) error {
	r0 := m.ProcessFunc.nextHook()(v0, v1)
	m.ProcessFunc.appendCall(ProcessorProcessFuncCall{v0, v1, r0})
	return r0
}

// SetDefaultHook sets function that is called when the Process method of
// the parent MockProcessor instance is invoked and the hook queue is empty.
func (f *ProcessorProcessFunc) SetDefaultHook(hook func(context.Context, store.Index) error) {
	f.defaultHook = hook
}

// PushHook adds a function to the end of hook queue. Each invocation of the
// Process method of the parent MockProcessor instance inovkes the hook at
// the front of the queue and discards it. After the queue is empty, the
// default hook function is invoked for any future action.
func (f *ProcessorProcessFunc) PushHook(hook func(context.Context, store.Index) error) {
	f.mutex.Lock()
	f.hooks = append(f.hooks, hook)
	f.mutex.Unlock()
}

// SetDefaultReturn calls SetDefaultDefaultHook with a function that returns
// the given values.
func (f *ProcessorProcessFunc) SetDefaultReturn(r0 error) {
	f.SetDefaultHook(func(context.Context, store.Index) error {
		return r0
	})
}

// PushReturn calls PushDefaultHook with a function that returns the given
// values.
func (f *ProcessorProcessFunc) PushReturn(r0 error) {
	f.PushHook(func(context.Context, store.Index) error {
		return r0
	})
}

func (f *ProcessorProcessFunc) nextHook() func(context.Context, store.Index) error {
	f.mutex.Lock()
	defer f.mutex.Unlock()

	if len(f.hooks) == 0 {
		return f.defaultHook
	}

	hook := f.hooks[0]
	f.hooks = f.hooks[1:]
	return hook
}

func (f *ProcessorProcessFunc) appendCall(r0 ProcessorProcessFuncCall) {
	f.mutex.Lock()
	f.history = append(f.history, r0)
	f.mutex.Unlock()
}

// History returns a sequence of ProcessorProcessFuncCall objects describing
// the invocations of this function.
func (f *ProcessorProcessFunc) History() []ProcessorProcessFuncCall {
	f.mutex.Lock()
	history := make([]ProcessorProcessFuncCall, len(f.history))
	copy(history, f.history)
	f.mutex.Unlock()

	return history
}

// ProcessorProcessFuncCall is an object that describes an invocation of
// method Process on an instance of MockProcessor.
type ProcessorProcessFuncCall struct {
	// Arg0 is the value of the 1st argument passed to this method
	// invocation.
	Arg0 context.Context
	// Arg1 is the value of the 2nd argument passed to this method
	// invocation.
	Arg1 store.Index
	// Result0 is the value of the 1st result returned from this method
	// invocation.
	Result0 error
}

// Args returns an interface slice containing the arguments of this
// invocation.
func (c ProcessorProcessFuncCall) Args() []interface{} {
	return []interface{}{c.Arg0, c.Arg1}
}

// Results returns an interface slice containing the results of this
// invocation.
func (c ProcessorProcessFuncCall) Results() []interface{} {
	return []interface{}{c.Result0}
}
