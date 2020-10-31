package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"strings"

	//"log"
	"html/template"
	"net/http"
)

type codigo struct {
	Codigo string
}

func getTraduccion(w http.ResponseWriter, r *http.Request) {
	var url = "http://localhost:3000/analisis/"
	var decoder = json.NewDecoder(r.Body)
	var c codigo
	err := decoder.Decode(&c)

	if err != nil {
		panic(err)
	}
	fmt.Println("\n-----------Codigo recibido en golang-----------")
	fmt.Println(c.Codigo)
	c.Codigo = strings.Replace(c.Codigo, "\"", "\\\"", -1)
	c.Codigo = strings.Replace(c.Codigo, "\n", "\\\n", -1)

	var jsonStr = []byte(`{"codigo":"` + c.Codigo + `"}`)
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonStr))
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		panic(err)
	}

	defer resp.Body.Close()
	bodyBytes, _ := ioutil.ReadAll(resp.Body)
	fmt.Println("\n-----------Respuesta del servidor-----------")
	fmt.Println(string(bodyBytes))
	fmt.Fprintf(w, string(bodyBytes))

}

func index(w http.ResponseWriter, r *http.Request) {
	t := template.Must(template.ParseFiles("index.html"))
	t.Execute(w, nil)
}

func main() {
	http.Handle("/js/", http.StripPrefix("/js/", http.FileServer(http.Dir("js/"))))

	http.HandleFunc("/", index)
	http.HandleFunc("/traducir", getTraduccion)
	fmt.Printf("Servidor escuchando en: http://localhost:8000/")
	http.ListenAndServe(":8000", nil)
}
