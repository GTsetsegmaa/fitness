# fitness

A personal, phone-first workout tracker for strength training, cardio and body metrics. Built with
Next.js, PostgreSQL and Drizzle, and deployed with Docker Compose and Caddy.

- What it does and why: [`SPEC.md`](SPEC.md)
- How it's built: [`docs/workflow.md`](docs/workflow.md)
- Database design: [`docs/data-model.md`](docs/data-model.md)

## Run locally

You need Node 24 and Docker.

```bash
npm ci
cp .env.example .env          # then set POSTGRES_PASSWORD (and the same password in DATABASE_URL)
docker compose up -d db       # Postgres on localhost:5433
npm run db:migrate            # create tables and the starter exercises
npm run dev                   # http://localhost:3000
```

Run everything in Docker, the way it runs on the server:

```bash
docker compose up -d --build  # https://localhost (accept the self-signed certificate)
```

## Checks

```bash
npm run check                 # lint + typecheck + tests (CI runs these on every PR)
npm run test:watch            # rerun tests on save
```
