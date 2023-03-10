package main

import (
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"io"
	"log"
	"net"
	"os"
	"path/filepath"
	"strings"
	"time"

	"deucalion-injector/win32"
)

var pe = win32.Provider{}

type RemoteProcessProvider interface {
	InjectDLL(processID uint32, payloadPath string) error
	DialPipe(path string, timeout *time.Duration) (net.Conn, error)
	IsPipeClosed(err error) bool
}

type DLLAlreadyInjectedError interface {
	IsDLLAlreadyInjectedError()
}

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

func checkHash(dllPath string, expected string) bool {
	f, err := os.Open(dllPath)
	if err != nil {
		panic(err)
	}
	h := sha256.New()
	if _, err := io.Copy(h, f); err != nil {
		log.Fatal(err)
	}
	hash := hex.EncodeToString(h.Sum(nil))
	if hash != expected {
		panic(fmt.Sprintf("Checksum doesn't match for dll. Expected %s, got %s", expected, hash))
	}
	return true
}

func main() {
	if len(os.Args) != 2 {
		panic("Must provide hash")
	}
	expectedHash := os.Args[1]
	ids, err := ListMatchingProcesses("ffxiv_dx11.exe")
	if err != nil {
		panic(err)
	}
	ex, err := os.Executable()
	if err != nil {
		panic(err)
	}
	exPath := filepath.Dir(ex)
	dllPath := filepath.Join(exPath, "./deucalion.dll")

	checkHash(dllPath, expectedHash)
	if len(ids) < 1 {
		panic("ERR_GAME_NOT_RUNNING")
	}
	// Simplified approach, don't ask for PID, just take the first one, screw multiboxing anyways
	var procID uint32 = ids[0]

	fmt.Println("PID", procID)
	err = pe.InjectDLL(procID, dllPath)
	if _, ok := err.(DLLAlreadyInjectedError); ok {
	} else if err != nil {
		panic(err)
	}
}
