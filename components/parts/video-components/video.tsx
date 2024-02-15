"use client";

import {
  useConnectionState,
  useRemoteParticipant,
  useTracks,
} from "@livekit/components-react";
import { Track, ConnectionState } from "livekit-client";
import Offline from "./offline";
import LoadingVideo from "./loading-video";
import LiveVideo from "./live-video";

interface VideoProps {
  hostname: string;
  identity: string;
}

const Video = ({ hostname, identity }: VideoProps) => {
  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(identity);
  const tracks = useTracks([
    Track.Source.Camera,
    Track.Source.Microphone,
  ]).filter((track) => track.participant.identity === identity);

  let content;

  if (!participant && connectionState === ConnectionState.Connected) {
    console.log({ participant, connectionState });
    content = <Offline username={hostname} />;
  } else if (!participant || tracks.length === 0) {
    console.log({ participant, tracks });
    content = <LoadingVideo label={connectionState} />;
  } else {
    content = <LiveVideo participant={participant} />;
  }
  return <div className="aspect-video border-b group relative">{content}</div>;
};

export default Video;
