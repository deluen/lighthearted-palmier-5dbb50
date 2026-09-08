# Book Management

A book catalog app: browse, search, add, edit, and delete book records. Originally built as a Java/Spring
Boot/Thymeleaf server-rendered app; this version is an Ionic + Angular client backed by Netlify Functions and
Netlify Database, so it can run as a responsive web app or be packaged as a native iOS/Android app with Capacitor.

## Key technologies

- **Angular 18** (standalone components) with **Ionic 8** for the UI
- **Netlify Functions** (TypeScript) exposing a REST API at `/api/books`
- **Netlify Database** (managed Postgres) with **Drizzle ORM** for persistence
- **Capacitor** for optional native iOS/Android builds

## Features

- List all books, with partial/case-insensitive search by title or author
- Add, edit, and delete books
- Server-side and client-side validation (title, author, ISBN, genre, publication year, publisher, description)

## Running locally

```bash
npm install
netlify dev
```

`netlify dev` serves the Angular app and proxies `/api/*` to the local Netlify Functions, backed by a local
Netlify Database branch. Alternatively, `npm start` runs just the Angular dev server (the API will not be
available without `netlify dev`).

## Building for native mobile

```bash
npm run build
npx cap add ios      # or: npx cap add android
npx cap sync
```

## REST API

| Method | Endpoint | Description |
|--------|----------|--------------|
| GET | `/api/books` | List all books |
| GET | `/api/books?query=...` | Partial, case-insensitive search by title/author |
| GET | `/api/books/:id` | Get a book by id |
| POST | `/api/books` | Create a new book |
| PUT | `/api/books/:id` | Update an existing book |
| DELETE | `/api/books/:id` | Delete a book |
