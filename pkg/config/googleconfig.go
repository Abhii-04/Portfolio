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
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("couldnt load .env file : ", err)
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
