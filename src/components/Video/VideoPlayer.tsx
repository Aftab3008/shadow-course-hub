import { cn } from "@/lib/utils";
import { formatTime } from "@/utils/utils";
import Hls from "hls.js";
import {
  FastForward,
  Loader2,
  Maximize,
  Minimize,
  Pause,
  Play,
  Rewind,
  Volume2,
  VolumeX,
} from "lucide-react";
import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { Slider } from "../ui/slider";

interface VideoPlayerProps {
  src: string;
  poster?: string;
  title?: string;
  autoplay?: boolean;
  loop?: boolean;
}

// Memoized control components to prevent unnecessary re-renders
const PlayPauseButton = memo(
  ({ isPlaying, onClick }: { isPlaying: boolean; onClick: () => void }) => (
    <button onClick={onClick} className="p-1 hover:text-green-400">
      {isPlaying ? <Pause size={20} /> : <Play size={20} />}
    </button>
  )
);

const VolumeControl = memo(
  ({
    isMuted,
    volume,
    onToggleMute,
    onVolumeChange,
  }: {
    isMuted: boolean;
    volume: number;
    onToggleMute: () => void;
    onVolumeChange: (v: number) => void;
  }) => (
    <>
      <button onClick={onToggleMute} className="p-1 hover:text-green-400">
        {isMuted || volume === 0 ? (
          <VolumeX size={20} />
        ) : (
          <Volume2 size={20} />
        )}
      </button>
      <Slider
        min={0}
        max={1}
        step={0.01}
        value={[isMuted ? 0 : volume]}
        onValueChange={(value) => onVolumeChange(value[0])}
        className="w-20 h-1 mx-1 bg-transparent slider-thumb-purple cursor-pointer"
      />
    </>
  )
);

const TimeDisplay = memo(
  ({ currentTime, duration }: { currentTime: number; duration: number }) => (
    <span className="tabular-nums">
      {formatTime(currentTime)} / {formatTime(duration)}
    </span>
  )
);

const PlaybackRateSelect = memo(
  ({
    playbackRate,
    onChangeRate,
  }: {
    playbackRate: number;
    onChangeRate: (rate: string) => void;
  }) => {
    const rates = useMemo(() => [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2], []);

    return (
      <Select value={playbackRate.toString()} onValueChange={onChangeRate}>
        <SelectTrigger className="w-20 bg-transparent outline-none border-none focus:ring-0 focus:border-none focus:ring-offset-0">
          <span>{playbackRate}x</span>
        </SelectTrigger>
        <SelectContent className="bg-slate-800">
          {rates.map((r) => (
            <SelectItem key={r} value={r.toString()}>
              {r}x
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }
);

const QualitySelect = memo(
  ({
    playbackQuality,
    availableQualities,
    onChangeQuality,
  }: {
    playbackQuality: string;
    availableQualities: string[];
    onChangeQuality: (quality: string) => void;
  }) => (
    <Select value={playbackQuality} onValueChange={onChangeQuality}>
      <SelectTrigger className="w-20 bg-transparent outline-none border-none focus:ring-0 focus:border-none focus:ring-offset-0">
        <span>
          {playbackQuality === "auto" ? "Auto" : `${playbackQuality}p`}
        </span>
      </SelectTrigger>
      <SelectContent className="bg-slate-800">
        <SelectItem key="auto" value="auto">
          Auto
        </SelectItem>
        {availableQualities
          .filter((q) => q !== "auto")
          .map((r) => (
            <SelectItem key={r} value={r}>
              {r}p
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  )
);

// State management with useReducer
interface VideoState {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  duration: number;
  currentTime: number;
  isFullscreen: boolean;
  playbackRate: number;
  playbackQuality: string;
  isHovering: boolean;
  isBuffering: boolean;
  availableQualities: string[];
}

type VideoAction =
  | { type: "SET_PLAYING"; payload: boolean }
  | { type: "SET_MUTED"; payload: boolean }
  | { type: "SET_VOLUME"; payload: number }
  | { type: "SET_DURATION"; payload: number }
  | { type: "SET_CURRENT_TIME"; payload: number }
  | { type: "SET_FULLSCREEN"; payload: boolean }
  | { type: "SET_PLAYBACK_RATE"; payload: number }
  | { type: "SET_PLAYBACK_QUALITY"; payload: string }
  | { type: "SET_HOVERING"; payload: boolean }
  | { type: "SET_BUFFERING"; payload: boolean }
  | { type: "SET_AVAILABLE_QUALITIES"; payload: string[] }
  | { type: "RESET_STATE"; payload: { autoplay: boolean } }
  | { type: "BATCH_UPDATE"; payload: Partial<VideoState> };

const videoReducer = (state: VideoState, action: VideoAction): VideoState => {
  switch (action.type) {
    case "SET_PLAYING":
      return { ...state, isPlaying: action.payload };
    case "SET_MUTED":
      return { ...state, isMuted: action.payload };
    case "SET_VOLUME":
      return { ...state, volume: action.payload };
    case "SET_DURATION":
      return { ...state, duration: action.payload };
    case "SET_CURRENT_TIME":
      return { ...state, currentTime: action.payload };
    case "SET_FULLSCREEN":
      return { ...state, isFullscreen: action.payload };
    case "SET_PLAYBACK_RATE":
      return { ...state, playbackRate: action.payload };
    case "SET_PLAYBACK_QUALITY":
      return { ...state, playbackQuality: action.payload };
    case "SET_HOVERING":
      return { ...state, isHovering: action.payload };
    case "SET_BUFFERING":
      return { ...state, isBuffering: action.payload };
    case "SET_AVAILABLE_QUALITIES":
      return { ...state, availableQualities: action.payload };
    case "RESET_STATE":
      return {
        ...state,
        isPlaying: action.payload.autoplay,
        currentTime: 0,
        duration: 0,
        isFullscreen: false,
        playbackQuality: "auto",
        availableQualities: ["auto"],
        isBuffering: false,
      };
    case "BATCH_UPDATE":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const initialState: VideoState = {
  isPlaying: false,
  isMuted: false,
  volume: 1,
  duration: 0,
  currentTime: 0,
  isFullscreen: false,
  playbackRate: 1,
  playbackQuality: "auto",
  isHovering: false,
  isBuffering: false,
  availableQualities: ["auto"],
};

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

  // Single state with useReducer
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

  // Memoized handlers to prevent unnecessary re-renders
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

  // Seek handlers with boundaries
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

  /* ───────────────────────────────
     Initialize HLS or direct video
  ─────────────────────────────── */
  useEffect(() => {
    // Reset state when src changes
    dispatch({ type: "RESET_STATE", payload: { autoplay } });

    const video = videoRef.current;
    if (!video) return;

    // Event handlers
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

    // HLS or direct video setup
    if (Hls.isSupported() && src.endsWith(".m3u8")) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true, // Better performance
        backBufferLength: 90, // Optimize buffer
      });

      hls.loadSource(src);
      hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
        const qualities = data.levels.map((level) => level.height.toString());
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

    // Add event listeners
    video.addEventListener("loadedmetadata", handleLoaded);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("waiting", handleWaiting);
    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("playing", handlePlaying);

    return () => {
      // Cleanup
      hlsRef.current?.destroy();
      video.removeEventListener("loadedmetadata", handleLoaded);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("waiting", handleWaiting);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("playing", handlePlaying);
      video.src = "";
      video.load();
      hlsRef.current = null;
    };
  }, [src, handleTimeUpdate]);

  /* ──────── Keyboard shortcuts ──────── */
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;

      switch (e.key) {
        case " ":
          e.preventDefault();
          togglePlay();
          break;
        case "m":
        case "M":
          e.preventDefault();
          toggleMute();
          break;
        case "f":
        case "F":
          e.preventDefault();
          toggleFullscreen();
          break;
        case "ArrowRight":
          e.preventDefault();
          seekForward();
          break;
        case "ArrowLeft":
          e.preventDefault();
          seekBackward();
          break;
        case "ArrowUp":
          e.preventDefault();
          volumeUp();
          break;
        case "ArrowDown":
          e.preventDefault();
          volumeDown();
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
    ]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  // Memoized control visibility logic
  const showControls = useMemo(
    () => isHovering || !isPlaying,
    [isHovering, isPlaying]
  );

  return (
    <div
      className={cn(
        "relative w-full rounded-lg overflow-hidden bg-black",
        "group aspect-video"
      )}
      onMouseEnter={() => dispatch({ type: "SET_HOVERING", payload: true })}
      onMouseLeave={() => dispatch({ type: "SET_HOVERING", payload: false })}
    >
      <video
        ref={videoRef}
        className="w-full h-full"
        poster={poster}
        loop={loop}
        autoPlay={autoplay}
        playsInline
      />

      {isBuffering && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <Loader2 className="animate-spin text-green-600" size={48} />
        </div>
      )}

      <div
        className={cn(
          "absolute inset-0 flex flex-col justify-end transition-opacity duration-300",
          showControls ? "opacity-100" : "opacity-0 group-hover:opacity-100",
          "bg-gradient-to-t from-black/70 via-black/30 to-transparent"
        )}
      >
        {/* Progress bar */}
        <Slider
          min={0}
          max={duration || 0}
          value={[currentTime]}
          step={0.1}
          onValueChange={(value) => seek(value[0])}
          className="w-full h-1 bg-transparent text-green-600 cursor-pointer slider-thumb-green"
        />

        {/* Controls row */}
        <div className="flex items-center justify-between px-3 py-2 text-white text-sm select-none">
          {/* Left controls */}
          <div className="flex items-center gap-2">
            <button onClick={seekBackward} className="p-1 hover:text-green-400">
              <Rewind size={18} />
            </button>

            <PlayPauseButton isPlaying={isPlaying} onClick={togglePlay} />

            <button onClick={seekForward} className="p-1 hover:text-green-400">
              <FastForward size={18} />
            </button>

            <VolumeControl
              isMuted={isMuted}
              volume={volume}
              onToggleMute={toggleMute}
              onVolumeChange={handleVolumeChange}
            />

            <TimeDisplay currentTime={currentTime} duration={duration} />
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            <PlaybackRateSelect
              playbackRate={playbackRate}
              onChangeRate={handleChangePlaybackRate}
            />

            <QualitySelect
              playbackQuality={playbackQuality}
              availableQualities={availableQualities}
              onChangeQuality={handleChangeQuality}
            />

            <button
              onClick={toggleFullscreen}
              className="p-1 hover:text-green-400 focus:ring-0 focus:outline-none"
            >
              {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
