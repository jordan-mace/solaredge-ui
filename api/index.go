package main

import (
	"fmt"
	"io"
	"net/http"
	"os"
	"strings"
	"time"
)

var APIKEY = os.Getenv("SE_API_KEY")
var SITE = os.Getenv("SE_SITE")
var monitorAPI = "https://monitoringapi.solaredge.com"

type cachedReply struct {
	data   string
	expiry time.Time
}

var cache = make(map[string]string)

func main() {
	http.HandleFunc("/api/site", handleSite)
	http.HandleFunc("/api/details", getDetails)
	http.HandleFunc("/api/energy", getEnergy)

	http.ListenAndServe(":8080", nil)
}

func getApiData(url string, useCache bool) string {
	var cached = cache[url]

	if useCache == true && cached != "" {
		fmt.Printf("Returning cached value for : " + url + "\n")
		return cached
	}

	fmt.Printf("GET: " + url + "\n")
	res, err := http.Get(url)
	if err != nil {
		return ""
	}

	fmt.Printf("GET: status code: %d\n", res.StatusCode)

	bodyBytes, err := io.ReadAll(res.Body)

	if useCache == true {
		cache[url] = string(bodyBytes)
	}

	return string(bodyBytes)
}

func reply(w http.ResponseWriter, r *http.Request, url string, cache bool) {
	if r.Method != "GET" {
		w.WriteHeader(http.StatusNotFound)
		return
	}

	w.Header().Add("Access-Control-Allow-Origin", "*")
	fmt.Fprintf(w, getApiData(url, cache))
}

func getDetails(w http.ResponseWriter, r *http.Request) {
	var url = monitorAPI + "/site/" + SITE + "/powerDetails" +
		"?startTime=" + time.Now().AddDate(0, -1, 0).Format("2006-01-02 15:04:05") +
		"&endTime=" + time.Now().Format("2006-01-02 15:04:05") +
		"&api_key=" + APIKEY
	url = strings.ReplaceAll(url, " ", "%20")
	reply(w, r, url, false)
}

func handleSite(w http.ResponseWriter, r *http.Request) {
	var url = monitorAPI + "/site/" + SITE + "/overview" + "?api_key=" + APIKEY
	reply(w, r, url, false)
}

func getEnergy(w http.ResponseWriter, r *http.Request) {
	var url = monitorAPI + "/site/" + SITE + "/energy?timeUnit=DAY&startDate=" + time.Now().AddDate(0, -1, 0).Format("2006-01-02") + "&endDate=" + time.Now().Format("2006-01-02") + "&api_key=" + APIKEY
	reply(w, r, url, true)
}
