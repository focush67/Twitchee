"use client";

import { Participant, Track } from "livekit-client";
import { useTracks } from "@livekit/components-react";
import { useEventListener } from "usehooks-ts";
import { useRef, useState, useEffect } from "react";
import Screen from "./screen";
import Volume from "./volume-controller";

interface LiveVideoProps {
  participant: Participant;
}

const LiveVideo = ({ participant }: LiveVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isFull, setFull] = useState(false);
  const [volume, setVolume] = useState(0);

  const onVolumeChange = (value: number) => {
    setVolume((prev) => prev + 1);
    if (videoRef.current) {
      videoRef.current.muted = value === 0;
      videoRef.current.volume = +value * 0.01;
    }
  };

  const toggleMute = () => {
    const isMuted = volume === 0;

    setVolume(isMuted ? 50 : 0);

    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      videoRef.current.volume = isMuted ? 0.5 : 0;
    }
  };

  const toggleFullScreen = () => {
    if (isFull) {
      document.exitFullscreen();
    } else if (wrapperRef.current) {
      wrapperRef.current.requestFullscreen();
    }
  };

  const handleScreenSizeChange = () => {
    const isCurrentlyFull = document.fullscreenElement !== null;
    setFull(isCurrentlyFull);
  };

  useEventListener("fullscreenchange", handleScreenSizeChange, wrapperRef);

  useTracks([Track.Source.Camera, Track.Source.Microphone])
    .filter((track) => track.participant.identity === participant.identity)
    .forEach((track) => {
      if (videoRef.current) {
        track.publication.track?.attach(videoRef.current);
      }
    });

  useEffect(() => {
    onVolumeChange(0);
  }, []);

  return (
    <div className="relative h-full flex" ref={wrapperRef}>
      <video width="100%" ref={videoRef} />
      <div className="absolute top-0 h-full w-full opacity-0 hover:opacity-100 transition-all">
        <div className="absolute bottom-0 flex h-14 w-full items-center justify-between bg-gradient-to-r from-neutral-900 px-4">
          <Volume
            onChange={onVolumeChange}
            value={volume}
            onToggle={toggleMute}
          />
          <Screen isFullScreen={isFull} onToggle={toggleFullScreen} />
        </div>
      </div>
    </div>
  );
};

export default LiveVideo;
