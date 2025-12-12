import { VideoAction, VideoState } from "@/types/video";

export const videoReducer = (
  state: VideoState,
  action: VideoAction
): VideoState => {
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

export const initialState: VideoState = {
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
