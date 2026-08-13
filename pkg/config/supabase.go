package config

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"github.com/supabase-community/supabase-go"
)
type Client struct{
	Client *supabase.Client
}

func NewSupabaseClient() *Client {
	err := godotenv.Load(".env")
	if err != nil {
		log.Println("couldnt load .env file:", err)
	}
	supabase_url := os.Getenv("SUPABASE_URL")
	// supabase_anon_key := os.Getenv("SUPABASE_ANON_KEY")
	supabase_service_role_key := os.Getenv("SUPABASE_SERVICE_KEY")
	if supabase_service_role_key==""{
		log.Println("SUPABASE_SERVICE_KEY is required for server side database writes")
	}

	client, err := supabase.NewClient(supabase_url, supabase_service_role_key, &supabase.ClientOptions{})
	if err != nil {
		fmt.Println("Failed to initialize the client:", err)
	}
	return &Client{
		Client:client,
	}
}
