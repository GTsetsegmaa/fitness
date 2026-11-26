import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { Suspense } from "react";
import { ExerciseList, ExerciseListSkeleton } from "@/components/exercise-list";
import { getDb } from "@/db";
import { listExercises } from "@/db/queries/exercises";

export const metadata: Metadata = { title: "Exercises · Fitness" };

// The heading and back link render immediately (the static shell). The list streams in at
// request time inside <Suspense>, so the page always shows fresh data and `next build` never
// needs a database. See node_modules/next/dist/docs/01-app/01-getting-started/08-caching.md.
export default function ExercisesPage() {
  return (
    <main className="flex flex-1 flex-col gap-6 bg-zinc-950 px-4 py-6 text-zinc-50">
      <header className="flex flex-col gap-2">
        <Link href="/" className="text-sm text-zinc-400 hover:text-zinc-200">
          ← Home
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Exercises</h1>
      </header>
      <Suspense fallback={<ExerciseListSkeleton />}>
        <Exercises />
      </Suspense>
    </main>
  );
}

async function Exercises() {
  await connection(); // defer to request time: this data lives in the database
  const exercises = await listExercises(getDb());
  return <ExerciseList exercises={exercises} />;
}
