export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 bg-zinc-950 px-4 text-center text-zinc-50">
      <p className="text-sm font-medium uppercase tracking-widest text-emerald-400">
        Milestone 0
      </p>
      <h1 className="text-4xl font-bold tracking-tight">Fitness</h1>
      <p className="max-w-xs text-lg text-zinc-400">
        It&apos;s live. Next up: logging your first workout.
      </p>
      <button
        type="button"
        disabled
        className="h-14 w-full max-w-xs rounded-2xl bg-emerald-500 text-lg font-semibold text-zinc-950 opacity-60"
      >
        Start workout (coming soon)
      </button>
    </main>
  );
}
