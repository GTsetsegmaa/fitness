# Fitness Tracker: One-Page Spec

## Context
The repo is empty (just a README). This is a personal workout tracker for one user (you), meant to grow over time. It is also a learning project: how to start a project, how to choose a stack, and how to deploy it. Your biggest risk is losing motivation, so the plan **ships something live early** and adds complexity in small steps that each give you something visible.

## Requirements (from our Q&A)
| Area | Decision |
|---|---|
| Users | Just you to start, but with a real data model and auth so it can grow |
| Device | Phone at the gym: mobile-first, big tap targets, fast set entry |
| Tracks | Strength (sets × reps × weight), cardio (distance/time/pace), body metrics |
| Routines | An **ordered rotation** (A → B → C → A…) with **no calendar dates**. The app shows "next up" based on the last workout you finished |
| Overload | Each exercise shows **last session's sets/reps/weight** next to the input |
| Insights | A clean history log, progress charts, auto-detected personal records |
| Offline | v1 is online-only. Offline + sync comes later as a learning step |
| Integrations | Strava import for cardio (later phase) |
| Hosting | Develop locally, then a ~$5/month VPS with Docker |
| Language | Industry standard / fastest: **TypeScript end to end** |
| Units | US user: the app shows **lb, miles, min/mile** everywhere. The database stores metric (see Data model) |

## Stack
- **Next.js (App Router) + TypeScript**: one codebase for UI and API (server actions/route handlers). It's the industry default and the fastest path.
- **Tailwind CSS + shadcn/ui**: quick, good-looking mobile UI.
- **PostgreSQL + Drizzle ORM**: type-safe SQL, with migrations checked into git. Handles all the data this project will ever have.
- **Better Auth**: email/password with sign-up disabled (only you). Opening sign-ups later is a config change.
- **Recharts**: progress charts.
- **Deploy:** Hetzner/DigitalOcean VPS running **Docker Compose** (app + Postgres) behind **Caddy** (automatic HTTPS), plus a nightly `pg_dump` backup.
- **Later:** PWA + IndexedDB (Dexie) outbox for offline; the Strava API (OAuth + webhooks) for import.

## Data model (store kg / meters / seconds; convert units only for display)
Values are stored metric at full precision. They're converted to lb / mi / min-per-mile only at the edges (input and display, via `src/lib/units.ts`) and rounded for display (0.1 lb, 0.01 mi). Strava already sends meters and seconds, and keeping one unit in the database means PRs and charts never mix units.

- `exercises`: name, kind (`strength | cardio`)
- `routines`: name, `position` (its place in the rotation)
- `routine_exercises`: routine, exercise, order, target sets/reps
- `sessions`: routine (nullable), started/finished time, notes, `source` (`manual | strava`), `external_id`
- `sets`: session, exercise, order, reps + weight (strength) or duration + distance (cardio), RPE
- `body_metrics`: date, bodyweight, measurements (JSON)
- **Next workout** = the routine with the next `position` after your last finished session's routine, wrapping back to the start.
- **PRs** are computed by queries: heaviest weight at each rep count, estimated 1RM (Epley formula), fastest pace for each distance.

## Milestones (each one ends with something you can open on your phone)
0. **Walking skeleton (day 1–2):** scaffold Next.js, push to GitHub, deploy "Hello" to the VPS over HTTPS with your domain.
1. **Log a workout (week 1):** login, an exercise list, start a session, add sets, finish. History list.
2. **Rotation + overload (week 2):** build routines in order, a "Next up" home screen, last-time numbers shown inline.
3. **Progress (week 3):** PR detection with a 🎉 badge, per-exercise charts, body-metrics log and chart.
4. **Strava import:** OAuth connect, backfill past activities, webhook for new ones, mapped to cardio sessions.
5. **Offline-first PWA:** installable app, local outbox, sync when back online, conflict handling.
6. **Grow:** open sign-ups, a per-user unit preference (metric option), export to CSV.

## Out of scope for now
Bodyweight/class tracking (yoga, HIIT), native mobile apps, a calendar/scheduling view, social features, Apple Health/Garmin.

## How we start (after approval)
1. Save this spec to the repo as `SPEC.md` and commit it on a branch.
2. Begin Milestone 0: `create-next-app` (TS, Tailwind, App Router), add a Dockerfile and `docker-compose.yml`, and deploy.

## Verification
- **M0:** the domain loads over HTTPS from your phone on cellular data.
- **M1–3:** run a real gym session on your phone. Last-time numbers show up, the rotation moves to the next routine, and a new PR gets flagged.
- **Every milestone:** `docker compose up` works locally, and migrations apply cleanly on the VPS.
