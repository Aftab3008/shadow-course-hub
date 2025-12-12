export interface VideoState {
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

export type VideoAction =
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

export interface VideoPlayerProps {
  src: string;
  poster?: string;
  title?: string;
  autoplay?: boolean;
  loop?: boolean;
}
