import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

export type Db = NodePgDatabase<typeof schema>;

let db: Db | undefined;

/**
 * The app's database connection, created on first use. It's lazy so that importing this module
 * (for example during `next build`) never needs a running database.
 */
export function getDb(): Db {
  if (!db) {
    const url = process.env.DATABASE_URL;
    if (!url) {
      throw new Error(
        "DATABASE_URL is not set. Copy .env.example to .env and start Postgres with `docker compose up -d db`.",
      );
    }
    db = drizzle(new Pool({ connectionString: url }), { schema });
  }
  return db;
}
