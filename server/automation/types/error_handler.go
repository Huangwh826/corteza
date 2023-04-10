package types

import (
	"context"
	"github.com/cortezaproject/corteza/server/pkg/wfexec"
)

type (
	errorHandlerStep struct {
		wfexec.StepIdentifier
		handler wfexec.Step
		Results ExprSet
	}
)

func ErrorHandlerStep(h wfexec.Step, rr ExprSet) *errorHandlerStep {
	return &errorHandlerStep{handler: h, Results: rr}
}

// Executes prompt step
func (h errorHandlerStep) Exec(_ context.Context, req *wfexec.ExecRequest) (wfexec.ExecResponse, error) {
	return wfexec.ErrorHandler(h.handler, req.Scope), nil
}
