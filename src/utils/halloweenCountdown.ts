export type CountdownParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

/** All day October 31 (local time) — show awakened message instead of the timer. */
export function isHalloweenDay(from: Date = new Date()): boolean {
  return from.getMonth() === 9 && from.getDate() === 31;
}

/**
 * Next Oct 31 at 00:00:00 local time.
 * After Halloween day ends (Nov 1+), targets next year's Oct 31.
 * While it is Oct 31, callers should use {@link isHalloweenDay} instead of counting down.
 */
export function getNextHalloweenMidnight(from: Date = new Date()): Date {
  const year = from.getFullYear();
  let target = new Date(year, 9, 31, 0, 0, 0, 0);

  if (from.getTime() >= target.getTime()) {
    target = new Date(year + 1, 9, 31, 0, 0, 0, 0);
  }

  return target;
}

/** Target date for the countdown, or null when the beast is awake (Halloween day). */
export function getHalloweenCountdownTarget(from: Date = new Date()): Date | null {
  if (isHalloweenDay(from)) {
    return null;
  }
  return getNextHalloweenMidnight(from);
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
