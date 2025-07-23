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

export function formatDuration(secondsStr: string): string {
  if (!/^\d+$/.test(secondsStr)) {
    throw new Error(
      `Invalid input: "${secondsStr}" is not a non-negative integer string.`
    );
  }

  const totalSeconds = parseInt(secondsStr, 10);
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
