import React, { useState } from "react";
import ReactPlayer from "react-player";
import defaultVideo from "../../../public/assets/1.mp4"; // Adjust the path as necessary

interface MediaPlayerProps {
  url: string;
  volume?: number;
  playbackRate?: number;
}

const MediaPlayer: React.FC<MediaPlayerProps> = ({
  url = defaultVideo,
  volume = 0.8,
  playbackRate = 1.0,
}) => {
  const [ready, setReady] = useState<boolean>(false);
  const [playing, setPlaying] = useState<boolean>(false);

  const handleReady = (): void => {
    setReady(true);
    console.log("Media loaded successfully");
  };

  const handleStart = (): void => {
    console.log("Playback started");
  };

  const handlePlay = (): void => {
    setPlaying(true);
    console.log("Playback resumed");
  };

  const handlePause = (): void => {
    setPlaying(false);
    console.log("Playback paused");
  };

  const handleEnded = (): void => {
    console.log("Playback completed");
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <ReactPlayer
        src={url}
        controls
        playing={playing}
        volume={volume}
        playbackRate={playbackRate}
        width="100%"
        height="100%"
        style={{ maxWidth: "100%", maxHeight: "100%" }}
        onReady={handleReady}
        onStart={handleStart}
        onPlay={handlePlay}
        onPause={handlePause}
        onEnded={handleEnded}
      />
    </div>
  );
};

export default MediaPlayer;
