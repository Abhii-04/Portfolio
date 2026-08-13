package main

import (
	"net/http"

	"github.com/Abhii-04/Portfolio/controllers"
	"github.com/Abhii-04/Portfolio/pkg/config"
	"github.com/Abhii-04/Portfolio/pkg/handlers"
	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
)

func routes(app *config.AppConfig) http.Handler {
	mux := chi.NewRouter()
	mux.Use(middleware.Recoverer)
	mux.Use(app.Session.LoadAndSave)
	controllers.NewControllers(app)

	mux.Get("/", handlers.Repo.Home)
	mux.Get("/internship", handlers.Repo.Internship)
	mux.Get("/login", handlers.Repo.Login)
	mux.Post("/logout", handlers.Repo.Logout)

	mux.Group(func(protected chi.Router) {
		protected.Use(RequireAuth)
		protected.Get("/profile", handlers.Repo.Profile) //profile page not yet created so its causing this error
	})
	mux.Group(func(admin chi.Router) {
		admin.Use(RequireRole("admin"))
		admin.Get("/admin", handlers.Repo.Admin) //Admin page not yet created which is causing this error
	})

	mux.Get("/google_login", controllers.GoogleLogin)
	mux.Get("/google_callback", controllers.GoogleCallback)

	assetFiles := http.StripPrefix("/static/assets", http.FileServer(http.Dir("./frontend/assets")))
	mux.Handle("/static/assets/*", assetFiles)

	staticFiles := http.StripPrefix("/static", http.FileServer(http.Dir("./frontend/static")))
	mux.Handle("/static/*", staticFiles)

	return mux
}
