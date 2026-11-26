import type { Exercise, ExerciseKind } from "@/db/schema";

type ExerciseItem = Pick<Exercise, "id" | "name" | "kind">;

const SECTIONS: { kind: ExerciseKind; title: string }[] = [
  { kind: "strength", title: "Strength" },
  { kind: "cardio", title: "Cardio" },
];

/** Exercises grouped into Strength and Cardio. Purely presentational: data comes in as props. */
export function ExerciseList({ exercises }: { exercises: ExerciseItem[] }) {
  if (exercises.length === 0) {
    return <p className="py-12 text-center text-zinc-400">No exercises yet.</p>;
  }

  return (
    <div className="flex flex-col gap-8">
      {SECTIONS.map(({ kind, title }) => {
        const items = exercises.filter((e) => e.kind === kind);
        if (items.length === 0) return null;
        return (
          <section key={kind} aria-labelledby={`${kind}-heading`}>
            <h2
              id={`${kind}-heading`}
              className="mb-2 flex items-baseline justify-between text-sm font-medium uppercase tracking-widest text-emerald-400"
            >
              {title}
              <span className="text-zinc-500">{items.length}</span>
            </h2>
            <ul className="divide-y divide-zinc-800 overflow-hidden rounded-2xl bg-zinc-900">
              {items.map((exercise) => (
                <li key={exercise.id} className="flex min-h-14 items-center px-4 text-lg">
                  {exercise.name}
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}

/** Shown while the list streams in from the database. */
export function ExerciseListSkeleton() {
  return (
    <div className="flex flex-col gap-3" aria-hidden="true">
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} className="h-14 animate-pulse rounded-2xl bg-zinc-900" />
      ))}
    </div>
  );
}
