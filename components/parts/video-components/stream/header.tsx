"use client";

import {
  useParticipants,
  useRemoteParticipant,
} from "@livekit/components-react";
import UserAvatar, { UserAvatarSkeleton } from "../../user-avatar";
import { VerifiedMark } from "../../verified";
import { UserIcon } from "lucide-react";
import Actions, { ActionsSkeleton } from "./actions";
import { Skeleton } from "@/components/ui/skeleton";

interface HeaderProps {
  host: string;
  hostId: string;
  viewerId: string;
  imageUrl: string;
  isFollowing: boolean;
  name: string;
}

const Header = ({
  name,
  isFollowing,
  imageUrl,
  host,
  hostId,
  viewerId,
}: HeaderProps) => {
  const participants = useParticipants();
  const participant = useRemoteParticipant(hostId);

  const isLive = !!participant;
  const participantsCount = participants.length - 1;

  const hostAsViewer = `host-${hostId}`;
  const isHost = viewerId === hostAsViewer;

  return (
    <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4">
      <div className="flex items-center gap-x-3">
        <UserAvatar
          username={host}
          imageUrl={imageUrl}
          size={"lg"}
          isLive={isLive}
          showBadge
        />
        <div className="space-y-1">
          <div className="flex items-center gap-x-2">
            <h2 className="text-lg font-semibold">{host}</h2>
            <VerifiedMark />
          </div>
          <p className="text-sm font-semibold">{name}</p>
          <p>
            {isLive ? (
              <div className="font-semibold flex gap-x-1 items-center text-xs text-rose-500">
                {<UserIcon className="h-4 w-4" />}{" "}
                <p>
                  {participantsCount}{" "}
                  {participantsCount === 1 ? "Viewer" : "Viewers"}
                </p>
              </div>
            ) : (
              <p className="font-semibold text-xs text-muted-foreground">
                Offline
              </p>
            )}
          </p>
        </div>
      </div>
      <Actions isFollowing={isFollowing} hostId={hostId} isHost={isHost} />
    </div>
  );
};

export default Header;

export const HeaderSkeleton = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4">
      <div className="flex items-center gap-x-3">
        <UserAvatarSkeleton size={"lg"} />
        <div className="space-y-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      <ActionsSkeleton />
      <Skeleton />
    </div>
  );
};
