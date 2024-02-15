"use client";

import { useViewerToken } from "@/hooks/useViewerToken";
import { Stream } from "@prisma/client";
import { User } from "@prisma/client";
import { LiveKitRoom } from "@livekit/components-react";
import Video from "./video";

interface StreamPlayerProps {
  user: User & { stream: Stream | null };
  stream: Stream;
  isFollowing: boolean;
}

const StreamPlayer = ({ user, stream, isFollowing }: StreamPlayerProps) => {
  const { name, identity, token } = useViewerToken(user.id);
  const url = process.env.NEXT_PUBLIC_LIVEKIT_WS_URL || "";
  if (!name || !identity || !token) {
    return <div>Cannot watch this stream</div>;
  }
  return (
    <>
      <LiveKitRoom
        token={token}
        serverUrl={url}
        className="grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full"
      >
        <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden:scrollbar pb-10">
          <Video hostname={user.username} identity={user.id} />
        </div>
      </LiveKitRoom>
    </>
  );
};

export default StreamPlayer;
