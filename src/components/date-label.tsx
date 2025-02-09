"use client";

import { cn } from "@/utils/cn";
import { formatDate } from "@/utils/date-formatter";

function DateLabel({
  date,
  options,
  className = "",
}: {
  date: Date | number | null;
  options?: Intl.DateTimeFormatOptions;
  className?: string;
}) {
  return <p className={className}>{formatDate(date, options)}</p>;
}

export default DateLabel;
