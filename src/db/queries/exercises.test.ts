// @vitest-environment node
import { beforeEach, describe, expect, test } from "vitest";
import { PGlite } from "@electric-sql/pglite";
import { drizzle, type PgliteDatabase } from "drizzle-orm/pglite";
import { migrate } from "drizzle-orm/pglite/migrator";
import * as schema from "@/db/schema";
import { exercises } from "@/db/schema";
import { listExercises } from "./exercises";

// PGlite is real Postgres compiled to WebAssembly, running in memory inside the test.
// Each test gets a fresh database with the real migrations from drizzle/ applied.
let db: PgliteDatabase<typeof schema>;

beforeEach(async () => {
  db = drizzle(new PGlite(), { schema });
  await migrate(db, { migrationsFolder: "drizzle" });
});

describe("exercises", () => {
  test("migrations seed the starter list", async () => {
    const all = await listExercises(db);
    const names = all.map((e) => e.name);

    expect(all.filter((e) => e.kind === "strength")).toHaveLength(12);
    expect(all.filter((e) => e.kind === "cardio")).toHaveLength(6);
    expect(names).toContain("Bench Press");
    expect(names).toContain("Running");
  });

  test("lists strength before cardio, alphabetical within each", async () => {
    const all = await listExercises(db);
    const kinds = all.map((e) => e.kind);
    const lastStrength = kinds.lastIndexOf("strength");
    const firstCardio = kinds.indexOf("cardio");
    expect(lastStrength).toBeLessThan(firstCardio);

    const strengthNames = all.filter((e) => e.kind === "strength").map((e) => e.name);
    expect(strengthNames).toEqual([...strengthNames].sort());
  });

  test("names are unique regardless of case", async () => {
    await expect(
      db.insert(exercises).values({ name: "bench press", kind: "strength" }),
    ).rejects.toThrow();
  });

  test("a new name can be added", async () => {
    await db.insert(exercises).values({ name: "Hip Thrust", kind: "strength" });
    const names = (await listExercises(db)).map((e) => e.name);
    expect(names).toContain("Hip Thrust");
  });
});
