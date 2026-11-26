import { defineConfig } from "drizzle-kit";

// Next.js loads .env for the app, but drizzle-kit doesn't, so load it here (Node's built-in loader).
// In Docker there is no .env file: DATABASE_URL comes from docker-compose.yml instead.
try {
  process.loadEnvFile(".env");
} catch {
  // no .env file: use the environment as-is
}

// Used by the drizzle-kit CLI (db:generate, db:migrate, db:studio), not by the app itself.
export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "",
  },
});
