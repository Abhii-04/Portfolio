# Static Asset Routing

## Problem

Portfolio templates load images with URLs like:

```html
<img src="/static/assets/images/pfp.jpeg" alt="Abhishek" />
```

The image files are stored in:

```text
frontend/assets/images/
```

Previously, the Go router only served this directory:

```go
staticFiles := http.StripPrefix("/static", http.FileServer(http.Dir("./frontend/static")))
mux.Handle("/static/*", staticFiles)
```

That meant `/static/styles/styles.css` worked because it maps to
`frontend/static/styles/styles.css`, but `/static/assets/images/pfp.jpeg` did
not work because the server looked for:

```text
frontend/static/assets/images/pfp.jpeg
```

That folder does not exist.

## Fix

The router now exposes `frontend/assets` separately under `/static/assets`:

```go
assetFiles := http.StripPrefix("/static/assets", http.FileServer(http.Dir("./frontend/assets")))
mux.Handle("/static/assets/*", assetFiles)

staticFiles := http.StripPrefix("/static", http.FileServer(http.Dir("./frontend/static")))
mux.Handle("/static/*", staticFiles)
```

With this mapping:

```text
/static/assets/images/pfp.jpeg -> frontend/assets/images/pfp.jpeg
/static/styles/styles.css      -> frontend/static/styles/styles.css
```

## Usage

Use `/static/assets/...` for files in `frontend/assets`.

Examples:

```html
<img src="/static/assets/images/pfp.jpeg" alt="Profile photo" />
<img src="/static/assets/images/naiyo24-logo.svg" alt="Naiyo24" />
```

Use `/static/styles/...` for CSS files in `frontend/static/styles`.
