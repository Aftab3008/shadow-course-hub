import { Pause, Play } from "lucide-react";
import { memo, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface PlayPauseButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  isPlaying: boolean;
  onClick: () => void;
  iconSize?: number;
  className?: string;
  ariaLabel?: string;
}

const PlayPauseButton = memo<PlayPauseButtonProps>(
  ({
    isPlaying,
    onClick,
    iconSize = 20,
    className,
    ariaLabel,
    disabled,
    ...restProps
  }) => {
    const defaultAriaLabel = isPlaying ? "Pause video" : "Play video";
    return (
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        aria-label={ariaLabel || defaultAriaLabel}
        className={cn(
          "inline-flex items-center justify-center rounded-md",
          "hover:bg-white/20 hover:text-primary active:scale-95",
          "focus:outline-none focus:ring-2 focus:ring-primary/50",
          "transition-all duration-200 group",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-current",
          className
        )}
        {...restProps}
      >
        {isPlaying ? (
          <Pause
            size={iconSize}
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:scale-110"
          />
        ) : (
          <Play
            size={iconSize}
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:scale-110 ml-0.5"
          />
        )}
      </button>
    );
  }
);

export default PlayPauseButton;
