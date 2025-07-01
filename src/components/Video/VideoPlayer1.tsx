import { cn } from "@/lib/utils";
import videojs from "video.js";
import type Player from "video.js/dist/types/player";
import "video.js/dist/video-js.css";
import {
  FastForward,
  Maximize,
  Minimize,
  Pause,
  Play,
  Rewind,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Slider } from "../ui/slider";

interface VideoPlayerProps {
  src: string;
  poster?: string;
  title?: string;
  autoplay?: boolean;
  loop?: boolean;
}

export default function VideoPlayer1({
  src,
  poster,
  title = "Video",
  autoplay = false,
  loop = false,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<Player | null>(null);

  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [playbackQuality, setPlaybackQuality] = useState("auto");
  const [isHovering, setIsHovering] = useState(false);
  const [availableQualities, setAvailableQualities] = useState<string[]>([
    "auto",
    "360",
    "480",
    "720",
    "1080",
  ]);

  /* ───────────────────────────────
     Initialize Video.js player
  ─────────────────────────────── */
  useEffect(() => {
    if (!videoRef.current || playerRef.current) return;

    // Create video element for Video.js
    const videoElement = document.createElement("video-js");
    videoElement.classList.add("vjs-big-play-centered");
    videoRef.current.appendChild(videoElement);

    const videoJsOptions = {
      autoplay: autoplay,
      controls: false,
      responsive: true,
      fluid: true,
      loop: loop,
      poster: poster,
      preload: "auto",
      sources: [
        {
          src: src,
          type: src.endsWith(".m3u8") ? "application/x-mpegURL" : "video/mp4",
        },
      ],
      html5: {
        hls: {
          enableLowInitialPlaylist: true,
          smoothQualityChange: true,
        },
      },
    };

    // Initialize Video.js player
    const player = videojs(videoElement, videoJsOptions, () => {
      console.log("Video.js player is ready");
    });

    playerRef.current = player;

    // Event listeners
    player.on("loadedmetadata", () => {
      setDuration(player.duration() || 0);
    });

    player.on("timeupdate", () => {
      setCurrentTime(player.currentTime());
    });

    player.on("play", () => {
      setIsPlaying(true);
    });

    player.on("pause", () => {
      setIsPlaying(false);
    });

    player.on("volumechange", () => {
      setVolume(player.volume());
      setIsMuted(player.muted());
    });

    player.on("fullscreenchange", () => {
      setIsFullscreen(player.isFullscreen());
    });

    // Handle HLS quality levels
    player.on("loadedmetadata", () => {
      const tech = player.tech() as any;
      if (tech && tech.hls && tech.hls.playlists && tech.hls.playlists.master) {
        const playlists = tech.hls.playlists.master.playlists;
        if (playlists && playlists.length > 0) {
          const qualities = playlists
            .filter(
              (playlist: any) =>
                playlist.attributes && playlist.attributes.RESOLUTION
            )
            .map((playlist: any) =>
              playlist.attributes.RESOLUTION.height.toString()
            )
            .sort((a: string, b: string) => parseInt(b) - parseInt(a));
          setAvailableQualities(["auto", ...qualities]);
        }
      }
    });

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [src, autoplay, loop, poster]);

  /* ──────── Helpers ──────── */
  const format = (time: number) =>
    new Date(time * 1000).toISOString().substring(time >= 3600 ? 11 : 14, 19);

  const togglePlay = () => {
    const player = playerRef.current;
    if (!player) return;

    if (isPlaying) {
      player.pause();
    } else {
      player.play();
    }
  };

  const seek = (time: number) => {
    const player = playerRef.current;
    if (player) {
      player.currentTime(time);
    }
  };

  const handleVolumeChange = (v: number) => {
    const player = playerRef.current;
    if (!player) return;

    player.volume(v);
    setVolume(v);
    setIsMuted(v === 0);
  };

  const toggleMute = () => {
    const player = playerRef.current;
    if (!player) return;

    const newMuted = !isMuted;
    player.muted(newMuted);
    setIsMuted(newMuted);

    if (!newMuted && player.volume() === 0) {
      player.volume(0.5);
      setVolume(0.5);
    }
  };

  const toggleFullscreen = () => {
    const player = playerRef.current;
    if (!player) return;

    if (player.isFullscreen()) {
      player.exitFullscreen();
    } else {
      player.requestFullscreen();
    }
  };

  const handlePlaybackRateChange = (rate: number) => {
    const player = playerRef.current;
    if (player) {
      player.playbackRate(rate);
      setPlaybackRate(rate);
    }
  };

  const handleQualityChange = (quality: string) => {
    const player = playerRef.current;
    if (!player) return;

    const tech = player.tech();
    if (tech && tech.hls) {
      if (quality === "auto") {
        tech.hls.bandwidth = undefined;
      } else {
        const targetHeight = parseInt(quality);
        const playlists = tech.hls.playlists.master.playlists;
        const targetPlaylist = playlists.find(
          (playlist: any) =>
            playlist.attributes &&
            playlist.attributes.RESOLUTION &&
            playlist.attributes.RESOLUTION.height === targetHeight
        );

        if (targetPlaylist) {
          tech.hls.selectPlaylist = () => targetPlaylist;
        }
      }
      console.log("Selected quality:", quality);
      setPlaybackQuality(quality);
    }
    console.log("Output quality:", quality);
  };

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
          seek(Math.min(currentTime + 10, duration));
          break;
        case "ArrowLeft":
          e.preventDefault();
          seek(Math.max(currentTime - 10, 0));
          break;
        case "ArrowUp":
          e.preventDefault();
          handleVolumeChange(Math.min(volume + 0.1, 1));
          break;
        case "ArrowDown":
          e.preventDefault();
          handleVolumeChange(Math.max(volume - 0.1, 0));
          break;
        default:
          break;
      }
    },
    [currentTime, duration, volume, isPlaying, isMuted]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  /* ─────────────────────────────── */

  return (
    <div
      className={cn(
        "relative w-full rounded-lg overflow-hidden bg-black",
        "group aspect-video"
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Video.js player container */}
      <div ref={videoRef} data-vjs-player className="w-full h-full" />

      {/* Custom overlay controls */}
      <div
        className={cn(
          "absolute inset-0 flex flex-col justify-end transition-opacity duration-300 pointer-events-none",
          isHovering || !isPlaying
            ? "opacity-100"
            : "opacity-0 group-hover:opacity-100",
          "bg-gradient-to-t from-black/70 via-black/30 to-transparent"
        )}
      >
        {/* Progress bar */}
        <div className="pointer-events-auto">
          <Slider
            min={0}
            max={duration || 0}
            value={[currentTime]}
            step={0.1}
            onValueChange={(value) => seek(value[0])}
            className="w-full h-1 bg-transparent text-green-600"
          />
        </div>

        {/* Controls row */}
        <div className="flex items-center justify-between px-3 py-2 text-white text-sm select-none pointer-events-auto">
          {/* Left */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => seek(Math.max(currentTime - 10, 0))}
              className="p-1 hover:text-green-400 transition-colors"
            >
              <Rewind size={18} />
            </button>

            <button
              onClick={togglePlay}
              className="p-1 hover:text-green-400 transition-colors"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>

            <button
              onClick={() => seek(Math.min(currentTime + 10, duration))}
              className="p-1 hover:text-green-400 transition-colors"
            >
              <FastForward size={18} />
            </button>

            <button
              onClick={toggleMute}
              className="p-1 hover:text-green-400 transition-colors"
            >
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
              onValueChange={(value) => handleVolumeChange(value[0])}
              className="w-20 h-1 mx-1 bg-transparent slider-thumb-purple"
            />

            <span className="tabular-nums text-xs">
              {format(currentTime)} / {format(duration)}
            </span>
          </div>

          {/* Right */}
          <div className="flex items-center gap-2">
            <Select
              value={playbackRate.toString()}
              onValueChange={(value) => handlePlaybackRateChange(Number(value))}
            >
              <SelectTrigger className="w-20 bg-transparent outline-none border-none focus:ring-0 focus:border-none focus:ring-offset-0 text-white">
                <span>{playbackRate}x</span>
              </SelectTrigger>
              <SelectContent className="bg-slate-800 text-white">
                {[0.5, 0.75, 1, 1.25, 1.5, 2].map((r) => (
                  <SelectItem
                    key={r}
                    value={r.toString()}
                    className="text-white"
                  >
                    {r}x
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select onValueChange={handleQualityChange} defaultValue="auto">
              <SelectTrigger className="w-20 bg-transparent outline-none border-none focus:ring-0 focus:border-none focus:ring-offset-0 text-white">
                <SelectValue>
                  {playbackQuality === "auto" ? "Auto" : `${playbackQuality}p`}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-slate-800 text-white">
                <SelectItem key="auto" value="auto" className="text-white">
                  Auto
                </SelectItem>
                {availableQualities
                  .filter((q) => q !== "auto")
                  .map((quality) => (
                    <SelectItem
                      key={quality.toString()}
                      value={quality.toString()}
                      className="text-white"
                    >
                      {quality}p
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>

            <button
              onClick={toggleFullscreen}
              className="p-1 hover:text-green-400 focus:ring-0 focus:outline-none transition-colors"
            >
              {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
