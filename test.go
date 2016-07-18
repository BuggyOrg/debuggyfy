package main

import (
	"bytes"
	"net/http"
	"strconv"
)

func main() {
	url := "http://localhost:3000"
	node := "node"
	port := "port"
	value := 5

	var jsonStr = []byte(`{ "node": "` + node + `", "port": "` + port + `", "value": "` + strconv.Itoa(value) +`" }`)
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonStr))
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()
}
