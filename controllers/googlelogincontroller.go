package controllers

import (
	"crypto/rand"
	"encoding/hex"
	"net/http"

	"github.com/Abhii-04/Portfolio/pkg/config"
)

var googleConfig = config.NewGoogleConfig()

func GoogleLogin(w http.ResponseWriter, r *http.Request) {
	if app == nil || app.Session == nil {
		http.Error(w, "session manager is not configured", http.StatusInternalServerError)
		return
	}

	state, err := generateOAuthState()
	if err != nil {
		http.Error(w, "failed to start authentication", http.StatusInternalServerError)
		return
	}

	app.Session.Put(r.Context(), "oauth_state", state)
	url := googleConfig.GoogleLoginConfig.AuthCodeURL(state)
	http.Redirect(w, r, url, http.StatusSeeOther)
}

func generateOAuthState() (string, error) {
	bytes := make([]byte, 32)
	if _, err := rand.Read(bytes); err != nil {
		return "", err
	}

	return hex.EncodeToString(bytes), nil
}
