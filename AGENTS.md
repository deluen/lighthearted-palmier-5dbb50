# AGENTS.md

## Architecture

This project ported a Spring Boot/Thymeleaf book-management app to a JAMstack architecture suited to Netlify:

- `src/` — Angular 18 standalone app (Ionic UI components). Routed via `src/app/app.routes.ts`, lazy-loaded pages
  under `src/app/pages/`. `BookService` (`src/app/services/book.service.ts`) is the only place that talks to the
  API — all HTTP calls go through it.
- `netlify/functions/` — REST API, replacing the old Spring `BookController`/`BookRestController`.
  - `books.mts` handles `GET /api/books` (list + `?query=` search) and `POST /api/books` (create).
  - `books-item.mts` handles `GET/PUT/DELETE /api/books/:id`.
  - `netlify/lib/validate.mts` holds the shared validation rules (mirrors the original `@NotBlank`/`@Min`/`@Max`
    annotations on the JPA entity). It lives outside `netlify/functions/` so the bundler doesn't treat it as its
    own function.
- `db/schema.ts` — Drizzle ORM schema for the `books` table (replaces the JPA `Book` entity). `db/index.ts` is the
  Drizzle client using the Netlify Database adapter.
- `netlify/database/migrations/` — SQL migrations, applied automatically by Netlify on deploy. The first
  migration also seeds the same five sample books the original app's `DataInitializer` inserted.

## Conventions

- Functions return the same validation error shape as the original API expected by the client:
  `{ errors: { fieldName: "message" } }` with a 400 status. The Angular form (`BookFormPage`) reads this and
  merges it with client-side Angular validators.
- Schema changes always go through `drizzle-kit generate` — never hand-edit the database directly.
- Keep the Ionic pages standalone (no NgModules); import only the specific `Ion*` components a page uses.

## Non-obvious decisions

- There is no server-rendered HTML anymore — the Angular build output (`www/`) is a static SPA, and `netlify.toml`
  redirects all non-function paths to `index.html` so Angular's router handles navigation.
- The REST contract intentionally matches the original Spring `/api/books` endpoints so the frontend logic (and
  anyone comparing against the old app) maps 1:1.
