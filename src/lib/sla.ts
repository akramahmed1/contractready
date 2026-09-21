/**
 * Business-day SLA engine for bid-kit turnaround promises.
 *
 * All calendar arithmetic is done on YYYY-MM-DD dates in America/Chicago so
 * weekends and DST never skew the count. "5 business days" means the promise
 * is due at the end of the 5th business day after the request. If a request
 * lands on a weekend or federal holiday, counting starts from the next
 * business day.
 */

const TZ = "America/Chicago";

const ymdFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: TZ,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

/** Calendar date of an instant, expressed in America/Chicago. */
export function toChicagoYMD(d: Date): string {
  return ymdFormatter.format(d);
}

function parseYMD(ymd: string): { y: number; m: number; d: number } {
  const [y, m, d] = ymd.split("-").map(Number);
  return { y, m, d };
}

function formatYMD(y: number, m: number, d: number): string {
  const mm = String(m).padStart(2, "0");
  const dd = String(d).padStart(2, "0");
  return `${y}-${mm}-${dd}`;
}

/** Add n calendar days to a YYYY-MM-DD date (UTC math avoids DST shifts). */
export function addCalendarDaysYMD(ymd: string, n: number): string {
  const { y, m, d } = parseYMD(ymd);
  const t = Date.UTC(y, m - 1, d) + n * 86_400_000;
  const out = new Date(t);
  return formatYMD(out.getUTCFullYear(), out.getUTCMonth() + 1, out.getUTCDate());
}

/** Weekday of a YYYY-MM-DD date: 0 = Sunday ... 6 = Saturday (UTC math). */
function weekdayOfYMD(ymd: string): number {
  const { y, m, d } = parseYMD(ymd);
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay();
}

function nthWeekdayOfMonth(year: number, month: number, weekday: number, n: number): string {
  // weekday: 0 = Sunday ... 6 = Saturday; month: 1-12
  const first = new Date(Date.UTC(year, month - 1, 1));
  const firstDow = first.getUTCDay();
  const offset = (weekday - firstDow + 7) % 7;
  const day = 1 + offset + (n - 1) * 7;
  return formatYMD(year, month, day);
}

function lastWeekdayOfMonth(year: number, month: number, weekday: number): string {
  const last = new Date(Date.UTC(year, month, 0)); // last day of month
  const lastDow = last.getUTCDay();
  const offset = (lastDow - weekday + 7) % 7;
  return formatYMD(year, month, last.getUTCDate() - offset);
}

/** Federal holidays as YYYY-MM-DD dates in America/Chicago, with weekend observance. */
export function getFederalHolidays(year: number): Set<string> {
  const fixed: Array<[number, number]> = [
    [1, 1], // New Year's Day
    [6, 19], // Juneteenth
    [7, 4], // Independence Day
    [11, 11], // Veterans Day
    [12, 25], // Christmas
  ];
  const floating = [
    nthWeekdayOfMonth(year, 1, 1, 3), // MLK Day: 3rd Monday of January
    nthWeekdayOfMonth(year, 2, 1, 3), // Presidents Day: 3rd Monday of February
    lastWeekdayOfMonth(year, 5, 1), // Memorial Day: last Monday of May
    nthWeekdayOfMonth(year, 9, 1, 1), // Labor Day: 1st Monday of September
    nthWeekdayOfMonth(year, 10, 1, 2), // Columbus Day: 2nd Monday of October
    nthWeekdayOfMonth(year, 11, 4, 4), // Thanksgiving: 4th Thursday of November
  ];
  const out = new Set<string>();
  for (const [m, d] of fixed) {
    const ymd = formatYMD(year, m, d);
    const dow = weekdayOfYMD(ymd);
    // Federal observance: Saturday holiday observed the Friday before,
    // Sunday holiday observed the Monday after.
    if (dow === 6) out.add(addCalendarDaysYMD(ymd, -1));
    else if (dow === 0) out.add(addCalendarDaysYMD(ymd, 1));
    else out.add(ymd);
  }
  for (const ymd of floating) out.add(ymd);
  return out;
}

const holidayCache = new Map<number, Set<string>>();
function holidaysFor(ymd: string): Set<string> {
  const { y } = parseYMD(ymd);
  let set = holidayCache.get(y);
  if (!set) {
    set = getFederalHolidays(y);
    holidayCache.set(y, set);
  }
  return set;
}

export function isBusinessDayYMD(ymd: string): boolean {
  const dow = weekdayOfYMD(ymd);
  if (dow === 0 || dow === 6) return false;
  return !holidaysFor(ymd).has(ymd);
}

/** Next business day on or after the given date. */
export function nextBusinessDayYMD(ymd: string): string {
  let cur = ymd;
  while (!isBusinessDayYMD(cur)) cur = addCalendarDaysYMD(cur, 1);
  return cur;
}

/**
 * Add n business days to a calendar date. The given date counts as day 0:
 * addBusinessDaysYMD("2026-09-21", 5) with Monday Sep 21 2026 lands on
 * Monday Sep 28 2026. Non-business-day inputs roll forward to the next
 * business day before counting.
 */
export function addBusinessDaysYMD(ymd: string, n: number): string {
  let cur = nextBusinessDayYMD(ymd);
  let remaining = n;
  while (remaining > 0) {
    cur = addCalendarDaysYMD(cur, 1);
    if (isBusinessDayYMD(cur)) remaining -= 1;
  }
  return cur;
}

/**
 * Business days from `from` (exclusive) to `to` (inclusive). Counts how many
 * business days of turnaround were consumed between two instants.
 */
export function businessDaysBetweenYMD(from: string, to: string): number {
  let count = 0;
  let cur = addCalendarDaysYMD(from, 1);
  while (cur <= to) {
    if (isBusinessDayYMD(cur)) count += 1;
    cur = addCalendarDaysYMD(cur, 1);
  }
  return count;
}

/** Promised-by calendar date for a request, given the turnaround promise. */
export function promisedByYMD(createdAt: Date, turnaroundBusinessDays = 5): string {
  return addBusinessDaysYMD(toChicagoYMD(createdAt), turnaroundBusinessDays);
}

export type BidKitSlaStatus =
  | "met" // delivered within the promise
  | "missed" // delivered after the promise
  | "on_track" // open and before the promised date
  | "due_today" // open and due today
  | "overdue"; // open and past the promised date

export function bidKitSlaStatus(
  createdAt: Date,
  deliveredAt: Date | null,
  now: Date = new Date(),
  turnaroundBusinessDays = 5
): { status: BidKitSlaStatus; promisedBy: string; businessDaysElapsed: number } {
  const promisedBy = promisedByYMD(createdAt, turnaroundBusinessDays);
  const today = toChicagoYMD(now);
  const endYmd = deliveredAt ? toChicagoYMD(deliveredAt) : today;
  const businessDaysElapsed = businessDaysBetweenYMD(toChicagoYMD(createdAt), endYmd);
  let status: BidKitSlaStatus;
  if (deliveredAt) {
    status = businessDaysElapsed <= turnaroundBusinessDays ? "met" : "missed";
  } else if (today > promisedBy) {
    status = "overdue";
  } else if (today === promisedBy) {
    status = "due_today";
  } else {
    status = "on_track";
  }
  return { status, promisedBy, businessDaysElapsed };
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** "2026-09-28" -> "September 28, 2026". */
export function formatLongYMD(ymd: string): string {
  const { y, m, d } = parseYMD(ymd);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}
