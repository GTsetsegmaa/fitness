// Canonical units: the database stores kilograms, meters and seconds.
// The UI shows pounds, miles and min/mile. Convert only at the edges:
// when a value comes in (user input, Strava) and when it is displayed.

export const KG_PER_LB = 0.45359237; // exact, by international definition
export const METERS_PER_MILE = 1609.344; // exact

export function lbToKg(lb: number): number {
  return lb * KG_PER_LB;
}

export function kgToLb(kg: number): number {
  return kg / KG_PER_LB;
}

export function milesToMeters(miles: number): number {
  return miles * METERS_PER_MILE;
}

export function metersToMiles(meters: number): number {
  return meters / METERS_PER_MILE;
}

// Display rounding: 0.1 lb for weight, 0.01 mi for distance.
const weightFormat = new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 });
const distanceFormat = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** 102.0582 kg -> "225 lb" */
export function formatWeight(kg: number): string {
  return `${weightFormat.format(kgToLb(kg))} lb`;
}

/** 5000 m -> "3.11 mi" */
export function formatDistance(meters: number): string {
  return `${distanceFormat.format(metersToMiles(meters))} mi`;
}

/** 5000 m in 1500 s -> "8:03 /mi" */
export function formatPace(meters: number, seconds: number): string {
  if (meters <= 0 || seconds <= 0) return "–";
  // Round to whole seconds first, then split, so 479.6 s shows "8:00", never "7:60".
  const secondsPerMile = Math.round(seconds / metersToMiles(meters));
  const minutes = Math.floor(secondsPerMile / 60);
  const rest = secondsPerMile % 60;
  return `${minutes}:${String(rest).padStart(2, "0")} /mi`;
}
