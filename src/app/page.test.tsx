import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "./page";

// Find things the way a user would (headings, button labels), not by CSS classes,
// so a redesign doesn't break the test unless the behavior changes.
test("home page shows the app name", () => {
  render(<Home />);
  expect(screen.getByRole("heading", { level: 1, name: "Fitness" })).toBeDefined();
});

test("start workout button is disabled until logging exists", () => {
  render(<Home />);
  const button = screen.getByRole("button", { name: /start workout/i });
  expect((button as HTMLButtonElement).disabled).toBe(true);
});

test("links to the exercise list", () => {
  render(<Home />);
  const link = screen.getByRole("link", { name: /browse exercises/i });
  expect(link.getAttribute("href")).toBe("/exercises");
});
