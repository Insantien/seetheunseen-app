/**
 * Format a number as Indian Rupees (e.g. 125000 → ₹1,25,000)
 */
export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format a date string to a human-readable format
 */
export function formatDate(
  dateString: string,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }
): string {
  return new Date(dateString).toLocaleDateString("en-IN", options);
}

/**
 * Truncate text to a given length, adding ellipsis if needed
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "…";
}

/**
 * Convert a duration in days to a human-readable string
 * e.g. 8 → "8 Days / 7 Nights"
 */
export function formatDuration(days: number): string {
  const nights = days - 1;
  return `${days} Day${days !== 1 ? "s" : ""} / ${nights} Night${nights !== 1 ? "s" : ""}`;
}

/**
 * Generate a reference number for inquiries
 */
export function generateRefNo(): string {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 5).toUpperCase();
  return `STU-${ts}-${rand}`;
}
