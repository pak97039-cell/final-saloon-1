/**
 * Formatting and local date utilities for Luxeora Studio
 * Strictly adheres to Asia/Karachi local calendar rules (no toISOString date slicing).
 */

const pkrFormatter = new Intl.NumberFormat('en-PK', {
  style: 'currency',
  currency: 'PKR',
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
});

/**
 * Formats a PKR amount into standardized currency display.
 * e.g., 28000 -> "PKR 28,000"
 */
export function formatPKR(amount: number): string {
  // Replace the default currency display with clear "PKR" if needed
  return pkrFormatter.format(amount).replace('₨', 'PKR ');
}

/**
 * Extracts YYYY-MM-DD from a local Date object without UTC drift
 */
export function toLocalISOString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Today's local date string (YYYY-MM-DD)
 */
export function todayLocalISO(): string {
  return toLocalISOString(new Date());
}

/**
 * Tomorrow's local date string (YYYY-MM-DD)
 */
export function tomorrowLocalISO(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return toLocalISOString(tomorrow);
}

/**
 * Add days to a date string (YYYY-MM-DD) and return YYYY-MM-DD in local time
 */
export function addDaysLocalISO(dateString: string, daysToAdd: number): string {
  const parts = dateString.split('-').map(Number);
  if (parts.length !== 3 || parts.some(isNaN)) {
    return todayLocalISO();
  }
  const [year, month, day] = parts;
  const d = new Date(year, month - 1, day);
  d.setDate(d.getDate() + daysToAdd);
  return toLocalISOString(d);
}

/**
 * Formats a YYYY-MM-DD date string into an editorial long date
 * e.g., "2026-10-14" -> "Tuesday, 14 October 2026"
 */
export function formatLongDate(dateStr: string): string {
  const parts = dateStr.split('-').map(Number);
  if (parts.length !== 3 || parts.some(isNaN)) {
    return dateStr;
  }
  const [year, month, day] = parts;
  const date = new Date(year, month - 1, day);

  return new Intl.DateTimeFormat('en-PK', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

/**
 * Formats a YYYY-MM-DD date string into a compact format
 * e.g., "2026-10-14" -> "14 Oct 2026"
 */
export function formatShortDate(dateStr: string): string {
  const parts = dateStr.split('-').map(Number);
  if (parts.length !== 3 || parts.some(isNaN)) {
    return dateStr;
  }
  const [year, month, day] = parts;
  const date = new Date(year, month - 1, day);

  return new Intl.DateTimeFormat('en-PK', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
}
