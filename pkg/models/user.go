package models

import "time"

type AppUser struct {
	ID            string     `json:"id,omitempty"`
	GoogleID      string     `json:"google_id"`
	Email         string     `json:"email"`
	Name          string     `json:"name"`
	AvatarURL     string     `json:"avatar_url"`
	VerifiedEmail bool       `json:"verified_email"`
	Role          string     `json:"role,omitempty"`
	Status        string     `json:"status,omitempty"`
	LastLoginAt   *time.Time `json:"last_login_at,omitempty"`
	CreatedAt     string     `json:"created_at,omitempty"`
	UpdatedAt     string     `json:"updated_at,omitempty"`
}
