"use client";

import { useViewerToken } from "@/hooks/useViewerToken";
import { Stream } from "@prisma/client";
import { User } from "@prisma/client";
import { LiveKitRoom } from "@livekit/components-react";
import Video, { VideoSkeleton } from "./video";
import { useContext } from "react";
import { ChatSidebarContext } from "@/context/chat-sidebar-context";
import { cn } from "@/lib/utils";
import Chat, { ChatSkeleton } from "../chat-related-components/chat";
import { ArrowLeftFromLine } from "lucide-react";
import Hint from "@/app/(browse)/_components/sidebar/hint";
import { Button } from "@/components/ui/button";
import randomColor from "randomcolor";
import Header, { HeaderSkeleton } from "./header";
import InfoCard from "./infocard";
import AboutCard from "./about";

interface StreamPlayerProps {
  user: User & { stream: Stream | null; _count: { followedBy: number } };
  stream: Stream;
  isFollowing: boolean;
}

const StreamPlayer = ({ user, stream, isFollowing }: StreamPlayerProps) => {
  const { name, identity, token } = useViewerToken(user.id);
  const { collapsed, onExpand } = useContext(ChatSidebarContext) || {};
  const color = randomColor();

  const url = process.env.NEXT_PUBLIC_LIVEKIT_WS_URL || "";
  if (!name || !identity || !token) {
    return <StreamSkeleton />;
  }
  return (
    <>
      {collapsed && (
        <div className="hidden lg:block fixed top-[90px] right-5 z-50">
          <Hint label={"Expand"} side="left" asChild>
            <Button
              onClick={() => onExpand?.()}
              variant={"ghost"}
              className={
                "h-auto p-2 hover:bg-white/10 hover:text-primary bg-transparent"
              }
            >
              <ArrowLeftFromLine className="h-4 w-4" />
            </Button>
          </Hint>
        </div>
      )}
      <LiveKitRoom
        token={token}
        serverUrl={url}
        className={cn(
          "grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full",
          collapsed && "lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2"
        )}
      >
        <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden:scrollbar pb-10">
          <Video hostname={user.username} identity={user.id} />
          <Header
            host={user.username}
            hostId={user.id}
            viewerId={identity}
            imageUrl={user.imageUrl}
            isFollowing={isFollowing}
            name={stream.name}
          />
          <InfoCard
            hostId={user.id}
            viewerId={identity}
            name={stream.name}
            thumbnail={stream.cover}
          />
          <AboutCard
            host={user.username}
            hostId={user.id}
            viewerId={identity}
            bio={user.bio}
            followedByCount={user._count.followedBy}
          />
        </div>

        <div className={cn("col-span-1", collapsed && "hidden")}>
          <Chat
            viewer={name}
            color={color}
            host={user.username}
            hostId={user.id}
            isFollowing={isFollowing}
            isChatEnabled={stream.isChatEnabled}
            isChatDelayed={stream.isChatDelayed}
            isChatPrivate={stream.isChatPrivate}
          />
        </div>
      </LiveKitRoom>
    </>
  );
};

export default StreamPlayer;

export const StreamSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full">
      <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2  2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
        <VideoSkeleton />
        <HeaderSkeleton />
      </div>
      <div className="col-span-1 bg-background">
        <ChatSkeleton />
      </div>
    </div>
  );
};
