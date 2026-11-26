@AGENTS.md

# Fitness tracker

A personal, phone-first workout tracker (strength, cardio, body metrics), built as a learning and
portfolio project. What we're building: `SPEC.md`. How we build it: `docs/workflow.md`.

## Stack
- Next.js 16 (App Router, `src/`, `output: "standalone"`), React 19, TypeScript, Tailwind CSS 4
- Tests: Vitest + React Testing Library (jsdom). Playwright for end-to-end tests, from Milestone 1
- Deploy: Docker Compose (`app` + `caddy`, plus Postgres from Milestone 1) on a VPS
- Planned: PostgreSQL + Drizzle ORM, Better Auth, Recharts, shadcn/ui

## Commands
- First time: `cp .env.example .env` and set a password (letters and digits only)
- `docker compose up -d db`: start Postgres (host port **5433**, so it doesn't clash with a system Postgres)
- `npm run db:migrate`: apply migrations in `drizzle/` to the database in `DATABASE_URL`
- `npm run db:generate`: create a migration after editing `src/db/schema.ts`. Read the SQL before committing.
- `npm run dev`: dev server at http://localhost:3000
- `npm run check`: lint + typecheck + tests. **Must pass before any change is called done.**
- `npm run test:watch`: rerun tests on save
- `npm run build`: production build
- `docker compose up -d --build`: full stack at https://localhost

## Conventions
- **Units:** store kilograms, meters, seconds, at full precision. The UI shows lb, miles and
  min/mi. Convert only at the edges with `src/lib/units.ts`. Never store a rounded or imperial value.
- **Tests:** every feature ships with tests. Put them next to the code as `*.test.ts(x)`. Query the
  UI the way a user would (`getByRole`, labels, visible text), never by CSS class.
- **Imports:** use the `@/` alias for anything under `src/`.
- **Database:** `src/db/schema.ts` is the source of truth, and `docs/data-model.md` explains it
  (update both together). Every schema change is a Drizzle migration committed in `drizzle/`.
  Reference data (like the starter exercises) goes in a custom migration. Never edit the database
  by hand.
- **Data access:** queries live in `src/db/queries/` and take `db` as a parameter, so tests can
  pass a PGlite database (`// @vitest-environment node`, real migrations applied). Pages get the
  real one from `getDb()` (`src/db/index.ts`).
- **Pages that read the database:** put the query in an async component that calls
  `await connection()`, wrapped in `<Suspense>` (Cache Components is on). Keep the rendering in a
  synchronous component that takes props, so React Testing Library can test it.
- **Mobile first:** design for a phone at the gym. Large tap targets, few taps per logged set.

## Workflow
- One slice per branch (`feat/...`, `fix/...`, `chore/...`). Never commit straight to `main`;
  changes land through a pull request with green CI.
- Plan before building anything non-trivial, and wait for approval.
- Keep diffs small enough to review in one sitting.
- Stage files by name. Don't stage the sandbox placeholder dotfiles (`.bashrc`, `.gitconfig`,
  `.claude/` ...) that appear in the repo root.
