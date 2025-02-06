const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "short", 
  day: "numeric",
};

export function formatDate(date: Date | number) {
  const formattedDateWithOptions = new Intl.DateTimeFormat(
    "id-ID",
    options
  ).format(date);

  return formattedDateWithOptions;
}
