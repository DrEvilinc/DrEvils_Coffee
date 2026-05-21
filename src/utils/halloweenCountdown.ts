export type CountdownParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

/** Next Oct 31 at 00:00:00 local time; rolls to next year once that moment has passed. */
export function getNextHalloweenMidnight(from: Date = new Date()): Date {
  const year = from.getFullYear();
  let target = new Date(year, 9, 31, 0, 0, 0, 0);

  if (from.getTime() >= target.getTime()) {
    target = new Date(year + 1, 9, 31, 0, 0, 0, 0);
  }

  return target;
}

export function getCountdownParts(target: Date, now: Date = new Date()): CountdownParts {
  let remaining = Math.max(0, target.getTime() - now.getTime());

  const days = Math.floor(remaining / 86_400_000);
  remaining -= days * 86_400_000;

  const hours = Math.floor(remaining / 3_600_000);
  remaining -= hours * 3_600_000;

  const minutes = Math.floor(remaining / 60_000);
  remaining -= minutes * 60_000;

  const seconds = Math.floor(remaining / 1_000);

  return { days, hours, minutes, seconds };
}

export function padCountdownUnit(value: number): string {
  return String(value).padStart(2, '0');
}
