import { memo, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface PlaybackRateProps {
  playbackRate: number;
  onChangeRate: (rate: string) => void;
  rates?: number[];
  disabled?: boolean;
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
  width?: string;
  showMultiplier?: boolean;
  ariaLabel?: string;
}

const PlaybackRate = memo<PlaybackRateProps>(
  ({
    playbackRate,
    onChangeRate,
    rates: customRates,
    disabled = false,
    className,
    triggerClassName,
    contentClassName,
    width = "w-20",
    showMultiplier = true,
    ariaLabel,
  }) => {
    const rates = useMemo(
      () => customRates || [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2],
      [customRates]
    );

    const displayValue = showMultiplier
      ? `${playbackRate}x`
      : playbackRate.toString();
    const defaultAriaLabel = `Playback speed: ${playbackRate}x`;

    return (
      <div className={cn("inline-flex", className)}>
        <Select
          value={playbackRate.toString()}
          onValueChange={onChangeRate}
          disabled={disabled}
        >
          <SelectTrigger
            className={cn(
              width,
              "bg-transparent outline-none border-none",
              "focus:ring-0 focus:border-none focus:ring-offset-0",
              "hover:bg-white/10 transition-colors duration-200",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              triggerClassName
            )}
            aria-label={ariaLabel || defaultAriaLabel}
          >
            <span className="text-sm font-medium tabular-nums">
              {displayValue}
            </span>
          </SelectTrigger>
          <SelectContent
            className={cn(
              "bg-slate-800 border-slate-700",
              "min-w-[4rem]",
              contentClassName
            )}
          >
            {rates.map((rate) => (
              <SelectItem
                key={rate}
                value={rate.toString()}
                className="hover:bg-slate-700 focus:bg-slate-700 cursor-pointer"
              >
                <span className="tabular-nums">
                  {showMultiplier ? `${rate}x` : rate}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }
);

export default PlaybackRate;
