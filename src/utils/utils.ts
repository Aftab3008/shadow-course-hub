import { format, parseISO, isValid } from "date-fns";

export const formatTime = (time: number) =>
  new Date(time * 1000).toISOString().substring(time >= 3600 ? 11 : 14, 19);

export function parseHMS(totalSeconds: number): {
  hours: number;
  minutes: number;
  seconds: number;
} {
  if (totalSeconds < 0) {
    throw new Error("Input must be a non-negative number of seconds");
  }

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { hours, minutes, seconds };
}

export function formatHMS(totalSeconds: number, pad: boolean = false): string {
  const { hours, minutes, seconds } = parseHMS(totalSeconds);

  const hStr = `${hours}h`;
  const mStr = pad ? `${minutes.toString().padStart(2, "0")}m` : `${minutes}m`;
  const sStr = pad ? `${seconds.toString().padStart(2, "0")}s` : `${seconds}s`;

  return [hStr, mStr, sStr].join(" ");
}

export function formatDuration(totalSeconds: number): string {
  if (
    typeof totalSeconds !== "number" ||
    !Number.isInteger(totalSeconds) ||
    totalSeconds < 0
  ) {
    throw new Error(
      `Invalid input: "${totalSeconds}" is not a non-negative integer.`
    );
  }

  const hours = Math.floor(totalSeconds / 3600);
  const remainingAfterHours = totalSeconds % 3600;
  const minutes = Math.floor(remainingAfterHours / 60);
  const seconds = remainingAfterHours % 60;

  const parts: string[] = [];
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (seconds > 0 || parts.length === 0) parts.push(`${seconds}s`);

  return parts.join(" ");
}

export function formatDate(date: Date | string): string {
  const parsedDate = typeof date === "string" ? parseISO(date) : date;
  if (!isValid(parsedDate)) {
    throw new Error(`Invalid date provided to formatDate(): ${date}`);
  }
  return format(parsedDate, "yyyy-MM-dd");
}

export const formatString = (str: string): string => {
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
};

export function formatName(name: string): string {
  if (!name) return "";
  const result = name
    .split(" ")
    .map((n) => n[0])
    .join("");
  return result.toUpperCase();
}

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
};
