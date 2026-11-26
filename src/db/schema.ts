// The database schema: the source of truth for every table.
// After changing this file, run `npm run db:generate` to create a migration in drizzle/.
// See docs/data-model.md for the full planned model.
import { sql } from "drizzle-orm";
import { integer, pgEnum, pgTable, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";

export const exerciseKind = pgEnum("exercise_kind", ["strength", "cardio"]);

export const exercises = pgTable(
  "exercises",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: text().notNull(),
    kind: exerciseKind().notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    // Case-insensitive uniqueness: "Bench Press" and "bench press" can't both exist.
    uniqueIndex("exercises_name_lower_idx").on(sql`lower(${table.name})`),
  ],
);

export type Exercise = typeof exercises.$inferSelect;
export type ExerciseKind = (typeof exerciseKind.enumValues)[number];
