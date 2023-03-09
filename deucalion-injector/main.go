package main

import (
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"io"
	"log"
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
		fmt.Fprintf(os.Stderr, "Must provide hash")
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
