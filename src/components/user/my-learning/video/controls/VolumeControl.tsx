import { Slider } from "@/components/ui/slider";
import { Volume2, VolumeX } from "lucide-react";
import { memo, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface VolumeControlProps {
  isMuted: boolean;
  volume: number;
  onToggleMute: () => void;
  onVolumeChange: (volume: number) => void;
  iconSize?: number;
  className?: string;
  buttonClassName?: string;
  sliderClassName?: string;
  muteAriaLabel?: string;
  sliderWidth?: string;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  buttonProps?: Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "onClick" | "disabled" | "className" | "aria-label"
  >;
}

const VolumeControl = memo<VolumeControlProps>(
  ({
    isMuted,
    volume,
    onToggleMute,
    onVolumeChange,
    iconSize = 20,
    className,
    buttonClassName,
    sliderClassName,
    muteAriaLabel,
    sliderWidth = "w-20",
    min = 0,
    max = 1,
    step = 0.01,
    disabled,
    buttonProps,
  }) => {
    const defaultMuteAriaLabel = isMuted ? "Unmute audio" : "Mute audio";
    const displayVolume = isMuted ? 0 : volume;

    return (
      <div className={cn("inline-flex items-center gap-1", className)}>
        <button
          type="button"
          onClick={onToggleMute}
          disabled={disabled}
          aria-label={muteAriaLabel || defaultMuteAriaLabel}
          className={cn(
            "inline-flex items-center justify-center p-1 rounded-sm",
            "hover:text-green-400 focus:text-green-400",
            "focus:outline-none focus:ring-2 focus:ring-green-400/20",
            "transition-colors duration-200",
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-current",
            buttonClassName
          )}
          {...buttonProps}
        >
          {isMuted || volume === 0 ? (
            <VolumeX size={iconSize} aria-hidden="true" />
          ) : (
            <Volume2 size={iconSize} aria-hidden="true" />
          )}
        </button>

        <Slider
          min={min}
          max={max}
          step={step}
          value={[displayVolume]}
          onValueChange={(value) => onVolumeChange(value[0])}
          disabled={disabled}
          aria-label={`Volume: ${Math.round(displayVolume * 100)}%`}
          className={cn(
            sliderWidth,
            "h-1 mx-1 bg-transparent slider-thumb-purple cursor-pointer",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            sliderClassName
          )}
        />
      </div>
    );
  }
);

export default VolumeControl;
