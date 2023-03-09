package hook

import (
	"fmt"
	"io"
	"net"
	"sync"
	"time"
)

type RemoteProcessProvider interface {
	InjectDLL(processID uint32, payloadPath string) error
	DialPipe(path string, timeout *time.Duration) (net.Conn, error)
	IsPipeClosed(err error) bool
}

type DLLAlreadyInjectedError interface {
	IsDLLAlreadyInjectedError()
}

type Conn struct {
	net.Conn
	rpp     RemoteProcessProvider
	isOwner bool

	once sync.Once
}

func NewConn(rpp RemoteProcessProvider, streamID uint32, dllPath string) (*Conn, error) {
	retryInterval := 500 * time.Millisecond
	isOwner := true

	err := rpp.InjectDLL(streamID, dllPath)
	if _, ok := err.(DLLAlreadyInjectedError); ok {
		isOwner = false
	} else if err != nil {
		return nil, err
	}

	var conn net.Conn
	pipeName := fmt.Sprintf(`\\.\pipe\deucalion-%d`, streamID)
	dialTimeout := 5 * time.Second

	for i := 0; i < 5; i++ {
		conn, err = rpp.DialPipe(pipeName, &dialTimeout)
		if err == nil {
			return &Conn{Conn: conn, rpp: rpp, isOwner: isOwner}, nil
		}
		// If we got some sort of error connecting to the pipe, that means
		// the hook hasn't started the pipe server yet. We need to retry in
		// some amount of time.
		time.Sleep(retryInterval)
	}
	return nil, err
}

// Write implements the Write interface of a net.Conn. It converts pipe closed
// errors to io.EOF.
func (h *Conn) Write(p []byte) (int, error) {
	n, err := h.Conn.Write(p)
	if h.rpp.IsPipeClosed(err) {
		return n, io.EOF
	}
	return n, err
}

// Write implements the Read interface of a net.Conn. It converts pipe closed
// errors to io.EOF.
func (h *Conn) Read(p []byte) (int, error) {
	n, err := h.Conn.Read(p)
	if h.rpp.IsPipeClosed(err) {
		return n, io.EOF
	}
	return n, err
}

// Close implements the Close interface of a net.Conn. It will attempt to send
// an Exit to the connection before closing. It is safe to call Close() more
// than once since subsequent Close() calls will be no-ops.
func (h *Conn) Close() error {
	var err error
	h.once.Do(func() {
		// if h.isOwner {
		// 	// The hook should automatically unload itself from FFXIV after
		// 	// closing the owner core process.
		_, _ = h.Conn.Write(Envelope{Op: OpExit}.Encode())
		// }
		err = h.Conn.Close()
	})
	return err
}
