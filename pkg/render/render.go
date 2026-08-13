package render

import (
	"bytes"
	"fmt"
	"html/template"
	"log"
	"net/http"
	"path/filepath"

	"github.com/Abhii-04/Portfolio/pkg/config"
)

var app *config.AppConfig

type NavLink struct {
	Href  string
	Label string
}

type NavbarData struct {
	LogoHref        string
	LogoText        string
	Links           []NavLink
	ActionHref      string
	ActionLabel     string
	IsAuthenticated bool
}

type FooterData struct {
	Text  string
	Links []NavLink
}

type UserData struct {
	Name          string
	Email         string
	Picture       string
	VerifiedEmail bool
}

type PageData struct {
	Navbar NavbarData
	Footer FooterData
	User   UserData
}

// NewTemplate sets the config from the Appconfig
func NewTemplate(a *config.AppConfig) {
	app = a
}

func RenderTemplate(w http.ResponseWriter, tmpl string, data PageData) {
	tc := app.TemplateCache //tc = template cache

	t, ok := tc[tmpl]
	if !ok {
		http.Error(w, "template not found", http.StatusInternalServerError)
		log.Printf("could not get %s from template cache", tmpl)
		return
	}

	//buffer
	buf := new(bytes.Buffer)
	err := t.Execute(buf, data)
	if err != nil {
		http.Error(w, "template render failed", http.StatusInternalServerError)
		log.Printf("could not execute %s: %v", tmpl, err)
		return
	}
	_, err = buf.WriteTo(w)
	if err != nil {
		fmt.Println("error writing template to browser")
	}

}

func CreateTemplateCache() (map[string]*template.Template, error) {
	mycache := map[string]*template.Template{}
	pages, err := filepath.Glob("./frontend/templates/*.ejs")
	if err != nil {
		fmt.Println("could not retrieve ejs pages from the path")
		return mycache, err
	}
	partials, err := filepath.Glob("./frontend/templates/partials/*.ejs")
	if err != nil {
		fmt.Println("could not retrieve ejs partials from the path")
		return mycache, err
	}

	for _, page := range pages {
		name := filepath.Base(page)

		files := append([]string{page}, partials...)
		tmpl, err := template.ParseFiles(files...)
		if err != nil {
			return mycache, err
		}
		mycache[name] = tmpl

	}
	return mycache, nil
}
