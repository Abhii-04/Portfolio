package main

import (
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/Abhii-04/Portfolio/pkg/config"
	"github.com/Abhii-04/Portfolio/pkg/handlers"
	"github.com/Abhii-04/Portfolio/pkg/render"
	"github.com/alexedwards/scs/v2"
)

const portnumber = ":8080"

var app config.AppConfig
var session *scs.SessionManager

func main() {
	app.InProduction = false

	supabaseClient := config.NewSupabaseClient()
	app.Supabase = supabaseClient.Client
	repo := handlers.NewRepo(&app, supabaseClient.Client)

	//session setup
	session = scs.New()
	session.Lifetime = 24 * time.Hour
	session.Cookie.Persist = true
	session.Cookie.SameSite = http.SameSiteLaxMode
	session.Cookie.Secure = app.InProduction
	app.Session = session

	tc, err := render.CreateTemplateCache()
	if err != nil {
		log.Fatal("cannot create template cache:", err)
	}
	app.TemplateCache = tc
	app.UseCache = false

	handlers.NewHandlers(repo)
	render.NewTemplate(&app)

	fmt.Printf("starting application on port %s \n", portnumber)

	src := &http.Server{
		Addr:    portnumber,
		Handler: routes(&app),
	}

	err = src.ListenAndServe()
	if err != nil {
		log.Fatal(err)
	}

}
