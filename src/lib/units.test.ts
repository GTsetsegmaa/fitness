import { describe, expect, test } from "vitest";
import {
  formatDistance,
  formatPace,
  formatWeight,
  kgToLb,
  lbToKg,
  milesToMeters,
} from "./units";

describe("weight", () => {
  test("1 lb is exactly 0.45359237 kg", () => {
    expect(lbToKg(1)).toBe(0.45359237);
  });

  test("225 lb survives the round trip through storage", () => {
    const stored = lbToKg(225); // what the database holds (102.058... kg)
    expect(kgToLb(stored)).toBeCloseTo(225, 10);
    expect(formatWeight(stored)).toBe("225 lb"); // never "224.9 lb"
  });

  test.each([2.5, 5, 10, 25, 45, 135, 185, 225, 315, 405])(
    "%s lb displays as entered",
    (lb) => {
      expect(formatWeight(lbToKg(lb))).toBe(`${lb} lb`);
    },
  );

  test("rounds to 0.1 lb for display", () => {
    expect(formatWeight(lbToKg(137.56))).toBe("137.6 lb");
  });
});

describe("distance", () => {
  test("a 5K displays as 3.11 mi", () => {
    expect(formatDistance(5000)).toBe("3.11 mi");
  });

  test("1 mile survives the round trip", () => {
    expect(formatDistance(milesToMeters(1))).toBe("1.00 mi");
  });
});

describe("pace", () => {
  test("a 25:00 5K is 8:03 per mile", () => {
    expect(formatPace(5000, 25 * 60)).toBe("8:03 /mi");
  });

  test("rounds seconds before splitting, so it never shows :60", () => {
    expect(formatPace(milesToMeters(1), 479.6)).toBe("8:00 /mi");
  });

  test("shows a dash when distance or time is missing", () => {
    expect(formatPace(0, 600)).toBe("–");
    expect(formatPace(5000, 0)).toBe("–");
  });
});
