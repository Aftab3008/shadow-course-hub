import { memo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface QualitySelectProps {
  playbackQuality: string;
  availableQualities: string[];
  onChangeQuality: (quality: string) => void;
  disabled?: boolean;
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
  width?: string;
  showAutoFirst?: boolean;
  autoLabel?: string;
  ariaLabel?: string;
}

const QualitySelect = memo<QualitySelectProps>(
  ({
    playbackQuality,
    availableQualities,
    onChangeQuality,
    disabled = false,
    className,
    triggerClassName,
    contentClassName,
    width = "w-20",
    showAutoFirst = true,
    autoLabel = "Auto",
    ariaLabel,
  }) => {
    const displayValue =
      playbackQuality === "auto" ? autoLabel : `${playbackQuality}p`;

    const defaultAriaLabel = `Video quality: ${displayValue}`;

    const hasAuto = availableQualities.includes("auto");
    const nonAutoQualities = availableQualities.filter((q) => q !== "auto");

    return (
      <div className={cn("inline-flex", className)}>
        <Select
          value={playbackQuality}
          onValueChange={onChangeQuality}
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
            <span className="text-sm font-medium">{displayValue}</span>
          </SelectTrigger>
          <SelectContent
            className={cn(
              "bg-slate-800 border-slate-700",
              "min-w-[4rem]",
              contentClassName
            )}
          >
            {hasAuto && showAutoFirst && (
              <SelectItem
                value="auto"
                className="hover:bg-slate-700 focus:bg-slate-700 cursor-pointer"
              >
                {autoLabel}
              </SelectItem>
            )}
            {nonAutoQualities.map((quality) => (
              <SelectItem
                key={quality}
                value={quality}
                className="hover:bg-slate-700 focus:bg-slate-700 cursor-pointer"
              >
                {quality}p
              </SelectItem>
            ))}
            {hasAuto && !showAutoFirst && (
              <SelectItem
                value="auto"
                className="hover:bg-slate-700 focus:bg-slate-700 cursor-pointer"
              >
                {autoLabel}
              </SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>
    );
  }
);

export default QualitySelect;
