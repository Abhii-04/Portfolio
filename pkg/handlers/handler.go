package handlers

import (
	"fmt"
	"net/http"

	"github.com/Abhii-04/Portfolio/pkg/config"
	"github.com/Abhii-04/Portfolio/pkg/render"
	"github.com/supabase-community/supabase-go"
)

var Repo *Repository

type Repository struct {
	App      *config.AppConfig
	Supabase *supabase.Client
}

// NewRepo creates a new repository
func NewRepo(a *config.AppConfig, sb *supabase.Client) *Repository {
	return &Repository{
		App:      a,
		Supabase: sb,
	}
}

// Newhandlers sets repository for the handlers
func NewHandlers(r *Repository) {
	Repo = r
}

func (m *Repository) Home(w http.ResponseWriter, r *http.Request) {
	render.RenderTemplate(w, "index.ejs", render.PageData{
		Navbar: render.NavbarData{
			LogoHref:        "/",
			LogoText:        "abhi.dev",
			IsAuthenticated: m.App.Session.GetBool(r.Context(), "authenticated"),
			Links: []render.NavLink{
				{Href: "#about", Label: "about"},
				{Href: "#projects", Label: "projects"},
				{Href: "#contact", Label: "contact"},
			},
		},
		Footer: render.FooterData{
			Text: "Abhishek Yadav | Fullstack & AI Systems Engineer",
			Links: []render.NavLink{
				{Href: "mailto:abhi740000@gmail.com", Label: "Email"},
				{Href: "https://github.com/Abhii-04", Label: "GitHub"},
				{Href: "https://linkedin.com", Label: "LinkedIn"},
			},
		},
	})
	fmt.Println("Home page loaded succesfully")
}

func (m *Repository) Internship(w http.ResponseWriter, r *http.Request) {
	render.RenderTemplate(w, "internship.ejs", render.PageData{
		Navbar: render.NavbarData{
			LogoHref:        "/",
			LogoText:        "~/",
			ActionHref:      "/",
			ActionLabel:     "Back to Home",
			IsAuthenticated: m.App.Session.GetBool(r.Context(), "authenticated"),
		},
		Footer: render.FooterData{
			Text: "Naiyo24 Internship | Abhishek Yadav",
			Links: []render.NavLink{
				{Href: "/", Label: "Home"},
				{Href: "mailto:abhi740000@gmail.com", Label: "Email"},
			},
		},
	})
	fmt.Println("Internsip page loaded succesfully")
}
func (m *Repository) Login(w http.ResponseWriter, r *http.Request) {
	render.RenderTemplate(w, "login.ejs", render.PageData{
		Navbar: render.NavbarData{
			LogoHref:        "/",
			LogoText:        "abhi.dev",
			ActionHref:      "/",
			ActionLabel:     "Back to Home",
			IsAuthenticated: m.App.Session.GetBool(r.Context(), "authenticated"),
		},
		Footer: render.FooterData{
			Text: "Authentication | Abhishek Yadav",
			Links: []render.NavLink{
				{Href: "/", Label: "Home"},
				{Href: "mailto:abhi740000@gmail.com", Label: "Email"},
			},
		},
	})
	fmt.Println("login page loaded succesfully")
}

func (m *Repository) Profile(w http.ResponseWriter, r *http.Request) {
	render.RenderTemplate(w, "profile.ejs", render.PageData{
		Navbar: render.NavbarData{
			LogoHref:    "/",
			LogoText:    "abhi.dev",
			ActionHref:  "/Logout",
			ActionLabel: "Logout",
		},
		Footer: render.FooterData{
			Text: "Authenticated Profile|Abhishek yadav",
			Links: []render.NavLink{
				{Href: "/", Label: "Home"},
			},
		},
		User: render.UserData{
			Name:          m.App.Session.GetString(r.Context(), "name"),
			Email:         m.App.Session.GetString(r.Context(), "email"),
			Picture:       m.App.Session.GetString(r.Context(), "picture"),
			VerifiedEmail: m.App.Session.GetBool(r.Context(), "verified_email"),
		},
	})
}
func (m *Repository) Logout(w http.ResponseWriter, r *http.Request) {
	if m.App == nil || m.App.Session == nil {
		http.Error(w, "session manager is not configured", http.StatusInternalServerError)
		return
	}
	if err := m.App.Session.Destroy(r.Context()); err != nil {
		http.Error(w, "failed to logout", http.StatusInternalServerError)
		return
	}
	http.Redirect(w, r, "/", http.StatusSeeOther)
}

func (m *Repository) Admin(w http.ResponseWriter, r *http.Request) {
	render.RenderTemplate(w, "admin.ejs", render.PageData{
		Navbar: render.NavbarData{
			LogoHref:    "/",
			LogoText:    "abhi.dev",
			ActionHref:  "/Logout",
			ActionLabel: "Logout",
		},
		Footer: render.FooterData{
			Text: "Authenticated Profile|Abhishek yadav",
			Links: []render.NavLink{
				{Href: "/", Label: "Home"},
			},
		},
		User: render.UserData{
			Name:          m.App.Session.GetString(r.Context(), "name"),
			Email:         m.App.Session.GetString(r.Context(), "email"),
			Picture:       m.App.Session.GetString(r.Context(), "picture"),
			VerifiedEmail: m.App.Session.GetBool(r.Context(), "verified_email"),
		},
	})
}
