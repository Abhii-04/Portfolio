package main

import "net/http"

func RequireAuth(next http.Handler) http.Handler {
	return http.HandlerFunc(func (w http.ResponseWriter,r *http.Request)  {
		if !app.Session.GetBool(r.Context(),"authenticated"){
			http.Redirect(w,r,"/login",http.StatusSeeOther)
			return
		}
		if app.Session.GetString(r.Context(),"status")=="blocked"{
			http.Error(w,"account is blocked",http.StatusForbidden)
			return
		}
		next.ServeHTTP(w,r)
	})
}


func RequireRole(role string)func(http.Handler)http.Handler  {
	return func (next http.Handler) http.Handler  {
		return http.HandlerFunc(func(w  http.ResponseWriter,r *http.Request){
			if !app.Session.GetBool(r.Context(),"authenticated"){
				http.Redirect(w,r,"/login",http.StatusSeeOther)
				return
			}

			if app.Session.GetString(r.Context(),"role")!=role{
				http.Error(w,"forbidden",http.StatusForbidden)
				return
			}
			next.ServeHTTP(w,r)
		})
	}
}
