package main

import (
	"fmt"
	"os"
	"os/signal"
	"path/filepath"
	"strings"
	"syscall"

	"deucalion-injector/hook"
	"deucalion-injector/win32"
)

var pe = win32.Provider{}

// ListMatchingProcesses lists all IDs for processes that match the given string
func ListMatchingProcesses(match string) ([]uint32, error) {
	procMap, err := pe.EnumerateProcesses()
	if err != nil {
		return nil, fmt.Errorf("EnumerateProcesses error: %s", err.Error())
	}

	var pids []uint32
	for pid, procName := range procMap {
		if strings.Contains(strings.ToLower(procName), strings.ToLower(match)) {
			pids = append(pids, pid)
		}
	}
	return pids, nil
}

const RECVZONEPACKET_SIG = "49 8B 40 10 4C 8B 50 38"

func main() {
	ids, err := ListMatchingProcesses("ffxiv_dx11.exe")
	if err != nil {
		panic(err)
	}
	// Simplified approach, don't ask for PID, just take the first one, screw multiboxing anyways
	var procID uint32 = ids[0]

	fmt.Println("PID", procID)
	dllPath, _ := filepath.Abs("./deucalion.dll")
	c, err := hook.NewConn(pe, procID, dllPath)
	if err != nil {
		panic(err)
	}
	sig := make(chan os.Signal)
	signal.Notify(sig, os.Interrupt, syscall.SIGTERM)
	go func() {
		<-sig
		c.Close()
		os.Exit(1)
	}()

	defer c.Close()
}
