export function formatDate(
  date: Date | number | null,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  },
  timeZone: "Asia/Jakarta" | "Asia/Makassar" | "Asia/Jayapura" = "Asia/Jakarta"
) {
  if (!date) {
    return "null";
  }
  const formattedDateWithOptions = new Intl.DateTimeFormat(
    "id-ID",
    { ...options, timeZone, timeZoneName: "short" }
  ).format(new Date(date));

  return formattedDateWithOptions;
}
