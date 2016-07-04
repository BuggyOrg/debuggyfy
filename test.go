package main

import (
	"bytes"
	"net/http"
)

func main() {
	url := "http://localhost:3000"

	var jsonStr = []byte(`{ "node":"node", "port":"port", "value":"value" }`)
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonStr))
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()
}
