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
- **Database (from Milestone 1):** every schema change is a Drizzle migration committed to git.
  Never edit the database by hand.
- **Mobile first:** design for a phone at the gym. Large tap targets, few taps per logged set.

## Workflow
- One slice per branch (`feat/...`, `fix/...`, `chore/...`). Never commit straight to `main`;
  changes land through a pull request with green CI.
- Plan before building anything non-trivial, and wait for approval.
- Keep diffs small enough to review in one sitting.
- Stage files by name. Don't stage the sandbox placeholder dotfiles (`.bashrc`, `.gitconfig`,
  `.claude/` ...) that appear in the repo root.
