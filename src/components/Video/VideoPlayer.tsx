
import { useEffect, useRef, useState, useCallback } from "react";
import ReactPlayer from "react-player";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  SkipBack,
  SkipForward,
} from "lucide-react";

interface VideoPlayerProps {
  src: string;
  onTimeUpdate?: (currentTime: number, duration: number) => void;
  onEnded?: () => void;
  initialTime?: number;
  autoPlay?: boolean;
}

const VideoPlayer = ({
  src,
  onTimeUpdate,
  onEnded,
  initialTime = 0,
  autoPlay = true,
}: VideoPlayerProps) => {
  const playerRef = useRef<ReactPlayer>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [hasSetInitialTime, setHasSetInitialTime] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (isReady && initialTime > 0 && !hasSetInitialTime && playerRef.current) {
      playerRef.current.seekTo(initialTime);
      setCurrentTime(initialTime);
      setHasSetInitialTime(true);
      console.log(`Video started at: ${initialTime}s`);
    }
  }, [isReady, initialTime, hasSetInitialTime]);

  // Reset hasSetInitialTime when src changes (new video)
  useEffect(() => {
    setHasSetInitialTime(false);
    setIsReady(false);
  }, [src]);

  const handleReady = useCallback(() => {
    setIsReady(true);
    if (playerRef.current) {
      setDuration(playerRef.current.getDuration());
    }
  }, []);

  const handleProgress = useCallback((state: { playedSeconds: number }) => {
    setCurrentTime(state.playedSeconds);
    if (playerRef.current) {
      const duration = playerRef.current.getDuration();
      onTimeUpdate?.(state.playedSeconds, duration);
    }
  }, [onTimeUpdate]);

  const handleEnded = useCallback(() => {
    setIsPlaying(false);
    onEnded?.();
  }, [onEnded]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (value: number[]) => {
    if (!playerRef.current) return;
    
    const newTime = (value[0] / 100) * duration;
    playerRef.current.seekTo(newTime);
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0] / 100;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const skipTime = (seconds: number) => {
    if (!playerRef.current) return;
    
    const newTime = Math.max(0, Math.min(currentTime + seconds, duration));
    playerRef.current.seekTo(newTime);
  };

  const toggleFullscreen = () => {
    const playerElement = playerRef.current?.getInternalPlayer();
    if (!playerElement) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      playerElement.requestFullscreen?.();
    }
  };

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div
      className="relative bg-black rounded-lg overflow-hidden group w-full h-full"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <ReactPlayer
        ref={playerRef}
        url={src}
        playing={isPlaying}
        volume={isMuted ? 0 : volume}
        muted={isMuted}
        width="100%"
        height="100%"
        onReady={handleReady}
        onProgress={handleProgress}
        onEnded={handleEnded}
        onDuration={setDuration}
        onClick={togglePlay}
        config={{
          file: {
            attributes: {
              crossOrigin: "anonymous",
            },
          },
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />

      {/* Controls Overlay */}
      <div
        className={`absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Progress Bar */}
        <div className="px-4 mb-2">
          <Slider
            value={[duration > 0 ? (currentTime / duration) * 100 : 0]}
            onValueChange={handleSeek}
            max={100}
            step={0.1}
            className="cursor-pointer"
          />
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between px-4 pb-4">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => skipTime(-10)}
              className="text-white hover:bg-white/20"
            >
              <SkipBack className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={togglePlay}
              className="text-white hover:bg-white/20"
            >
              {isPlaying ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => skipTime(10)}
              className="text-white hover:bg-white/20"
            >
              <SkipForward className="h-5 w-5" />
            </Button>

            <div className="flex items-center space-x-2 ml-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMute}
                className="text-white hover:bg-white/20"
              >
                {isMuted ? (
                  <VolumeX className="h-5 w-5" />
                ) : (
                  <Volume2 className="h-5 w-5" />
                )}
              </Button>

              <div className="w-20 hidden sm:block">
                <Slider
                  value={[isMuted ? 0 : volume * 100]}
                  onValueChange={handleVolumeChange}
                  max={100}
                  step={1}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-white text-sm hidden sm:block">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleFullscreen}
              className="text-white hover:bg-white/20"
            >
              <Maximize className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
