import { asc } from "drizzle-orm";
import type { PgDatabase, PgQueryResultHKT } from "drizzle-orm/pg-core";
import { exercises, type Exercise } from "@/db/schema";

// Any Postgres database Drizzle can talk to: the real one (node-postgres) or PGlite in tests.
type AnyPgDb = PgDatabase<PgQueryResultHKT, Record<string, unknown>>;

/** All exercises, strength first, then alphabetically. */
export async function listExercises(db: AnyPgDb): Promise<Exercise[]> {
  // Enum values sort in the order they're declared: strength, then cardio.
  return db.select().from(exercises).orderBy(asc(exercises.kind), asc(exercises.name));
}
