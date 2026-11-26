import { expect, test } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { ExerciseList } from "./exercise-list";

const sample = [
  { id: 1, name: "Bench Press", kind: "strength" as const },
  { id: 2, name: "Deadlift", kind: "strength" as const },
  { id: 3, name: "Running", kind: "cardio" as const },
];

test("groups exercises under Strength and Cardio", () => {
  render(<ExerciseList exercises={sample} />);

  const strength = screen.getByRole("region", { name: /strength/i });
  const cardio = screen.getByRole("region", { name: /cardio/i });

  expect(within(strength).getAllByRole("listitem").map((li) => li.textContent)).toEqual([
    "Bench Press",
    "Deadlift",
  ]);
  expect(within(cardio).getAllByRole("listitem").map((li) => li.textContent)).toEqual([
    "Running",
  ]);
});

test("hides a section that has no exercises", () => {
  render(<ExerciseList exercises={sample.filter((e) => e.kind === "strength")} />);
  expect(screen.queryByRole("region", { name: /cardio/i })).toBeNull();
});

test("shows an empty state when there are no exercises", () => {
  render(<ExerciseList exercises={[]} />);
  expect(screen.getByText("No exercises yet.")).toBeDefined();
});
