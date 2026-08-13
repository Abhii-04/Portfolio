package controllers

import (
	"context"
	"encoding/json"
	"io"
	"net/http"
	"time"

	"github.com/Abhii-04/Portfolio/pkg/config"
	"github.com/Abhii-04/Portfolio/pkg/models"
)

var app *config.AppConfig

type GoogleUser struct {
	ID            string `json:"id"`
	Email         string `json:"email"`
	Name          string `json:"name"`
	Picture       string `json:"picture"`
	VerifiedEmail bool   `json:"verified_email"`
}

func NewControllers(a *config.AppConfig) {
	app = a
}

func GoogleCallback(w http.ResponseWriter, r *http.Request) {
	if app == nil || app.Session == nil {
		http.Error(w, "session manager is not configured", http.StatusInternalServerError)
		return
	}
	now := time.Now().UTC()
	state := r.URL.Query().Get("state")
	expectedState := app.Session.PopString(r.Context(), "oauth_state")

	if state == "" || expectedState == "" || state != expectedState {
		http.Error(w, "state does not match", http.StatusBadRequest)
		return
	}

	code := r.URL.Query().Get("code")
	if code == "" {
		http.Error(w, "missing code", http.StatusBadRequest)
		return
	}

	token, err := googleConfig.GoogleLoginConfig.Exchange(context.Background(), code)
	if err != nil {
		http.Error(w, "failed to retrieve token", http.StatusInternalServerError)
		return
	}

	resp, err := http.Get("https://www.googleapis.com/oauth2/v2/userinfo?access_token=" + token.AccessToken)
	if err != nil {
		http.Error(w, "user data fetch failed", http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	userData, err := io.ReadAll(resp.Body)
	if err != nil {
		http.Error(w, "user data read failed", http.StatusInternalServerError)
		return
	}

	var user GoogleUser
	err = json.Unmarshal(userData, &user)
	if err != nil {
		http.Error(w, "invalid user data", http.StatusInternalServerError)
		return
	}

	if err := app.Session.RenewToken(r.Context()); err != nil {
		http.Error(w, "failed to renew session", http.StatusInternalServerError)
		return
	}
	upsertUser := models.AppUser{
		GoogleID:      user.ID,
		Email:         user.Email,
		Name:          user.Name,
		AvatarURL:     user.Picture,
		VerifiedEmail: user.VerifiedEmail,
		LastLoginAt:   &now,
	}
	var savedUsers []models.AppUser

	_, err = app.Supabase.
		From("app_users").
		Upsert(upsertUser, "google_id", "representation", "").
		ExecuteTo(&savedUsers)
	if err != nil {
		http.Error(w, "failed to save user: "+err.Error(), http.StatusInternalServerError)
		return
	}
	if len(savedUsers) == 0 {
		http.Error(w, "faield to load saved user", http.StatusInternalServerError)
		return
	}
	savedUser := savedUsers[0]

	app.Session.Put(r.Context(), "authenticated", true)
	app.Session.Put(r.Context(), "app_user_id", savedUser.ID)
	app.Session.Put(r.Context(), "google_id", savedUser.GoogleID)
	app.Session.Put(r.Context(), "email", savedUser.Email)
	app.Session.Put(r.Context(), "name", savedUser.Name)
	app.Session.Put(r.Context(), "picture", savedUser.AvatarURL)
	app.Session.Put(r.Context(), "verified_email", savedUser.VerifiedEmail)
	app.Session.Put(r.Context(), "role", savedUser.Role)
	app.Session.Put(r.Context(), "status", savedUser.Status)

	http.Redirect(w, r, "/", http.StatusSeeOther)
}
