/**
 * Formats an ISO 8601 date string into a human-readable format.
 *
 * Example input: `"1952-02-25T17:32:09.318179908Z"`
 * Example output: `"Today", "1 day ago", "25 Feb 1952"`
 *
 * @param isoDate - The ISO date string to format.
 * @returns A formatted date string, or `"Invalid date"` if parsing fails.
 */
export function formatDate(isoDate: string): string {
  const userLanguage = "en-GB"; // TODO: get user language to set the date format
  const date = new Date(isoDate);
  if (isNaN(date.getTime())) return "Invalid date";

  const now = new Date();
  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);

  if (isSameDay(date, now)) {
    return "Today";
  }

  if (isSameDay(date, yesterday)) {
    return "1 day ago";
  }

  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  return date.toLocaleString(userLanguage, options);
}
