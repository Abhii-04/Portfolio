package config

import (
	"html/template"
	"log"

	"github.com/alexedwards/scs/v2"
	"github.com/supabase-community/supabase-go"
)

type AppConfig struct {
	TemplateCache   map[string]*template.Template
	UseCache        bool
	IsAuthenticated bool
	InfoLog         *log.Logger
	InProduction    bool
	Session         *scs.SessionManager
	Google          *GoogleConfig
	Supabase        *supabase.Client
}
