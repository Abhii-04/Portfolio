package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
)

type GoogleConfig struct {
	GoogleLoginConfig oauth2.Config
}

func NewGoogleConfig() *GoogleConfig {
	if err := godotenv.Load(); err != nil {
		log.Println(".env not found, using system environment variables")
	}

	return &GoogleConfig{
		GoogleLoginConfig: oauth2.Config{
			RedirectURL:  "http://localhost:5000/google_callback",
			ClientID:     os.Getenv("GOOGLE_CLIENT_ID"),
			ClientSecret: os.Getenv("GOOGLE_CLIENT_SECRET"),
			Scopes: []string{"https://www.googleapis.com/auth/userinfo.email",
				"https://www.googleapis.com/auth/userinfo.profile"},
			Endpoint: google.Endpoint,
		},
	}
}
