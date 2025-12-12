import { initialState, videoReducer } from "@/hooks/reducers/video.reducer";
import { cn } from "@/lib/utils";
import { VideoPlayerProps } from "@/types/video";
import Hls from "hls.js";
import {
  FastForward,
  Loader2,
  Maximize,
  Minimize,
  Pause,
  Play,
  Rewind,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useReducer, useRef } from "react";
import PlaybackRate from "./controls/PlaybackRate";
import PlayPauseButton from "./controls/PlayPauseButton";
import QualitySelect from "./controls/QualitySelect";
import TimeDisplay from "./controls/TimeDisplay";
import VolumeControl from "./controls/VolumeControl";
import { Slider } from "@/components/ui/slider";

export default function VideoPlayer({
  src,
  poster,
  title = "Video",
  autoplay = false,
  loop = false,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);
  const timeUpdateRef = useRef<number>(0);

  const [state, dispatch] = useReducer(videoReducer, {
    ...initialState,
    isPlaying: autoplay,
  });

  const {
    isPlaying,
    isMuted,
    volume,
    duration,
    currentTime,
    isFullscreen,
    playbackRate,
    playbackQuality,
    isHovering,
    isBuffering,
    availableQualities,
  } = state;

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    isPlaying ? v.pause() : v.play();
  }, [isPlaying]);

  const seek = useCallback((time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  }, []);

  const handleVolumeChange = useCallback((v: number) => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.volume = v;
    dispatch({
      type: "BATCH_UPDATE",
      payload: { volume: v, isMuted: v === 0 },
    });
  }, []);

  const toggleMute = useCallback(() => {
    const vid = videoRef.current;
    if (!vid) return;
    const newMuted = !isMuted;
    vid.muted = newMuted;
    dispatch({ type: "SET_MUTED", payload: newMuted });
    if (!newMuted && vid.volume === 0) {
      handleVolumeChange(0.5);
    }
  }, [isMuted, handleVolumeChange]);

  const toggleFullscreen = useCallback(() => {
    const wrapper = videoRef.current?.parentElement;
    if (!wrapper) return;
    if (!document.fullscreenElement) {
      wrapper.requestFullscreen();
      dispatch({ type: "SET_FULLSCREEN", payload: true });
    } else {
      document.exitFullscreen();
      dispatch({ type: "SET_FULLSCREEN", payload: false });
    }
  }, []);

  const handleChangeQuality = useCallback((value: string) => {
    dispatch({ type: "SET_PLAYBACK_QUALITY", payload: value });
    if (hlsRef.current?.levels?.length && videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      const levelIndex = hlsRef.current.levels.findIndex(
        (level) => level.height?.toString() === value || value === "auto"
      );
      hlsRef.current.currentLevel = value === "auto" ? -1 : levelIndex;

      hlsRef.current.once(Hls.Events.LEVEL_SWITCHED, () => {
        if (videoRef.current) {
          videoRef.current.currentTime = currentTime;
        }
      });
    }
  }, []);

  const handleChangePlaybackRate = useCallback((value: string) => {
    const rate = Number(value);
    dispatch({ type: "SET_PLAYBACK_RATE", payload: rate });
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
    }
  }, []);

  // Throttled time update to reduce re-renders
  const handleTimeUpdate = useCallback(() => {
    const now = Date.now();
    if (now - timeUpdateRef.current > 100) {
      // Update every 100ms max
      timeUpdateRef.current = now;
      if (videoRef.current) {
        dispatch({
          type: "SET_CURRENT_TIME",
          payload: videoRef.current.currentTime,
        });
      }
    }
  }, []);

  const seekForward = useCallback(() => {
    seek(Math.min(currentTime + 10, duration));
  }, [currentTime, duration, seek]);

  const seekBackward = useCallback(() => {
    seek(Math.max(currentTime - 10, 0));
  }, [currentTime, seek]);

  const volumeUp = useCallback(() => {
    handleVolumeChange(Math.min(volume + 0.1, 1));
  }, [volume, handleVolumeChange]);

  const volumeDown = useCallback(() => {
    handleVolumeChange(Math.max(volume - 0.1, 0));
  }, [volume, handleVolumeChange]);

  useEffect(() => {
    dispatch({ type: "RESET_STATE", payload: { autoplay } });

    const video = videoRef.current;
    if (!video) return;

    const handleLoaded = () =>
      dispatch({ type: "SET_DURATION", payload: video.duration || 0 });
    const handlePlay = () => dispatch({ type: "SET_PLAYING", payload: true });
    const handlePause = () => dispatch({ type: "SET_PLAYING", payload: false });
    const handleWaiting = () =>
      dispatch({ type: "SET_BUFFERING", payload: true });
    const handleCanPlay = () =>
      dispatch({ type: "SET_BUFFERING", payload: false });
    const handlePlaying = () =>
      dispatch({ type: "SET_BUFFERING", payload: false });
    const handleError = (e: Event) => {
      console.error("Video error:", e);
      dispatch({ type: "SET_BUFFERING", payload: false });
    };
    const handleLoadStart = () =>
      dispatch({ type: "SET_BUFFERING", payload: true });

    if (Hls.isSupported() && src.includes(".m3u8")) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true, // Better performance
        backBufferLength: 90, // Optimize buffer
      });

      hls.loadSource(src);
      hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
        const qualities = data.levels.map((level) => level.height.toString());
        console.log("Available qualities:", qualities);
        dispatch({
          type: "SET_AVAILABLE_QUALITIES",
          payload: [...new Set(["auto", ...qualities])],
        });
      });
      hls.attachMedia(video);
      hlsRef.current = hls;
    } else {
      video.src = src;
    }

    video.playbackRate = playbackRate;

    video.addEventListener("loadedmetadata", handleLoaded);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("waiting", handleWaiting);
    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("playing", handlePlaying);
    video.addEventListener("error", handleError);
    video.addEventListener("loadstart", handleLoadStart);

    return () => {
      hlsRef.current?.destroy();
      video.removeEventListener("loadedmetadata", handleLoaded);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("waiting", handleWaiting);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("playing", handlePlaying);
      video.removeEventListener("error", handleError);
      video.removeEventListener("loadstart", handleLoadStart);
      video.src = "";
      video.load();
      hlsRef.current = null;
    };
  }, [src, handleTimeUpdate]);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;

      // Prevent default for all our handled keys
      const handledKeys = [
        " ",
        "k",
        "K",
        "m",
        "M",
        "f",
        "F",
        "ArrowRight",
        "ArrowLeft",
        "ArrowUp",
        "ArrowDown",
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
      ];

      if (handledKeys.includes(e.key)) {
        e.preventDefault();
      }

      switch (e.key) {
        case " ":
        case "k":
        case "K":
          togglePlay();
          break;
        case "m":
        case "M":
          toggleMute();
          break;
        case "f":
        case "F":
          toggleFullscreen();
          break;
        case "ArrowRight":
          seekForward();
          break;
        case "ArrowLeft":
          seekBackward();
          break;
        case "ArrowUp":
          volumeUp();
          break;
        case "ArrowDown":
          volumeDown();
          break;
        // Number keys for seeking to percentage
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
          const percentage = parseInt(e.key) * 10;
          const seekTime = (duration * percentage) / 100;
          seek(seekTime);
          break;
      }
    },
    [
      togglePlay,
      toggleMute,
      toggleFullscreen,
      seekForward,
      seekBackward,
      volumeUp,
      volumeDown,
      duration,
      seek,
    ]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  // Optimized show controls logic with auto-hide timeout
  const showControls = useMemo(
    () => isHovering || !isPlaying,
    [isHovering, isPlaying]
  );

  // Auto-hide controls after inactivity
  const hideControlsTimeoutRef = useRef<NodeJS.Timeout>();

  const resetHideControlsTimer = useCallback(() => {
    if (hideControlsTimeoutRef.current) {
      clearTimeout(hideControlsTimeoutRef.current);
    }

    if (isPlaying) {
      hideControlsTimeoutRef.current = setTimeout(() => {
        dispatch({ type: "SET_HOVERING", payload: false });
      }, 3000); // Hide after 3 seconds of inactivity
    }
  }, [isPlaying]);

  const handleMouseMove = useCallback(() => {
    dispatch({ type: "SET_HOVERING", payload: true });
    resetHideControlsTimer();
  }, [resetHideControlsTimer]);

  const handleMouseLeave = useCallback(() => {
    if (hideControlsTimeoutRef.current) {
      clearTimeout(hideControlsTimeoutRef.current);
    }
    dispatch({ type: "SET_HOVERING", payload: false });
  }, []);

  // Touch handling for mobile devices
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    // Show controls on touch
    dispatch({ type: "SET_HOVERING", payload: true });
  }, []);

  const handleTouchEnd = useCallback(() => {
    // Auto-hide controls after touch
    resetHideControlsTimer();
  }, [resetHideControlsTimer]);

  // Double tap to seek (left side = backward, right side = forward)
  const lastTapRef = useRef(0);

  const handleVideoClick = useCallback(
    (e: React.MouseEvent) => {
      // Don't handle clicks if they're on controls or near the bottom
      const rect = e.currentTarget.getBoundingClientRect();
      const clickY = e.clientY - rect.top;
      const height = rect.height;

      // If click is in bottom 15% of video (where controls are), ignore it
      if (clickY > height * 0.85) {
        return;
      }

      const now = Date.now();
      const timeDiff = now - lastTapRef.current;

      if (timeDiff < 300) {
        // Double click detected
        const clickX = e.clientX - rect.left;
        const width = rect.width;

        if (clickX < width * 0.4) {
          // Left side - seek backward
          seekBackward();
        } else if (clickX > width * 0.6) {
          // Right side - seek forward
          seekForward();
        } else {
          // Center - toggle play/pause
          togglePlay();
        }
      } else {
        // Single click - toggle play/pause after delay to check for double click
        setTimeout(() => {
          const newTimeDiff = Date.now() - lastTapRef.current;
          if (newTimeDiff >= 300) {
            togglePlay();
          }
        }, 300);
      }

      lastTapRef.current = now;
    },
    [seekBackward, seekForward, togglePlay]
  );

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hideControlsTimeoutRef.current) {
        clearTimeout(hideControlsTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      className={cn(
        "relative w-full rounded-lg overflow-hidden bg-black",
        "group aspect-video shadow-2xl"
      )}
      onMouseEnter={() => dispatch({ type: "SET_HOVERING", payload: true })}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        poster={poster}
        loop={loop}
        autoPlay={autoplay}
        playsInline
        onClick={handleVideoClick}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      />

      {isBuffering && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="flex flex-col items-center space-y-3">
            <Loader2 className="animate-spin text-primary" size={48} />
          </div>
        </div>
      )}

      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center transition-all duration-300 z-40 pointer-events-none",
          !isPlaying ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        )}
      >
        <div
          className={cn(
            "rounded-full bg-black/70 backdrop-blur-sm p-4 transition-all duration-200 pointer-events-auto",
            "hover:bg-black/80 hover:scale-110 cursor-pointer",
            "border border-white/20 hover:border-primary/50",
            !isPlaying && "center-play-button"
          )}
          onClick={togglePlay}
        >
          {isPlaying ? (
            <Pause
              className="text-white hover:text-primary transition-colors"
              size={32}
            />
          ) : (
            <Play
              className="text-white hover:text-primary transition-colors ml-1"
              size={32}
            />
          )}
        </div>
      </div>

      <div
        className={cn(
          "absolute inset-x-0 bottom-0 transition-all duration-300 z-50 pointer-events-auto",
          showControls
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-2 pointer-events-none",
          "bg-gradient-to-t from-black/80 via-black/40 to-transparent"
        )}
      >
        <div className="px-3 pb-2">
          <Slider
            min={0}
            max={duration || 1}
            value={[currentTime]}
            step={0.1}
            onValueChange={(value) => seek(value[0])}
            className="w-full video-progress-slider cursor-pointer"
          />
        </div>

        <div className="flex items-center justify-between px-3 py-3 text-white text-sm select-none">
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={seekBackward}
              className="video-control-button"
              aria-label="Seek backward 10 seconds"
            >
              <Rewind size={18} />
            </button>

            <PlayPauseButton
              isPlaying={isPlaying}
              onClick={togglePlay}
              iconSize={20}
              className="video-control-button"
            />

            <button
              onClick={seekForward}
              className="video-control-button"
              aria-label="Seek forward 10 seconds"
            >
              <FastForward size={18} />
            </button>

            <div className="hidden sm:block">
              <VolumeControl
                isMuted={isMuted}
                volume={volume}
                onToggleMute={toggleMute}
                onVolumeChange={handleVolumeChange}
              />
            </div>

            <TimeDisplay currentTime={currentTime} duration={duration} />
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <div className="hidden md:block">
              <PlaybackRate
                playbackRate={playbackRate}
                onChangeRate={handleChangePlaybackRate}
              />
            </div>

            <div className="hidden lg:block">
              <QualitySelect
                playbackQuality={playbackQuality}
                availableQualities={availableQualities}
                onChangeQuality={handleChangeQuality}
              />
            </div>

            <button
              onClick={toggleFullscreen}
              className="video-control-button"
              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
