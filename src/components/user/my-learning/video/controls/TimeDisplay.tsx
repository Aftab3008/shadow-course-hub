import { formatTime } from "@/utils/utils";
import { memo, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface TimeDisplayProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  currentTime: number;
  duration: number;
  separator?: string;
  showDuration?: boolean;
  format?: "short" | "long";
  className?: string;
}

const TimeDisplay = memo<TimeDisplayProps>(
  ({
    currentTime,
    duration,
    separator = " / ",
    showDuration = true,
    format = "short",
    className,
    ...restProps
  }) => {
    const formattedCurrentTime = formatTime(currentTime);
    const formattedDuration = formatTime(duration);

    return (
      <span
        className={cn(
          "tabular-nums text-sm font-medium",
          "select-none",
          className
        )}
        role="timer"
        aria-live="polite"
        aria-label={`Current time: ${formattedCurrentTime}${
          showDuration ? ` of ${formattedDuration}` : ""
        }`}
        {...restProps}
      >
        {formattedCurrentTime}
        {showDuration && (
          <>
            {separator}
            {formattedDuration}
          </>
        )}
      </span>
    );
  }
);

export default TimeDisplay;
