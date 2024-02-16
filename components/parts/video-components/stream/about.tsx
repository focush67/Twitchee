"use client";

import { VerifiedMark } from "../../verified";
import BioModal from "./bio-modal";

interface AboutProps {
  host: string;
  hostId: string;
  viewerId: string;
  followedByCount: number;
  bio: string | null;
}

const About = ({
  host,
  hostId,
  viewerId,
  followedByCount,
  bio,
}: AboutProps) => {
  const hostAsViwer = `host-${hostId}`;
  const isHost = viewerId === hostAsViwer;

  const followedByLabel = followedByCount === 1 ? "Follower" : "Followers";

  return (
    <div className="px-4 ">
      <div className="group rounded-xl bg-background p-6 lg:p-10 flex flex-col gap-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2 font-semibold text-lg lg:text-2xl">
            About {host}
            <VerifiedMark />
          </div>
          <div>{isHost && <BioModal />}</div>
        </div>

        <div className="text-sm text-muted-foreground">
          <span className="font-semibold text-primary">{followedByCount}</span>{" "}
          {followedByLabel}
        </div>
        <p className="text-sm">{bio || "User bio appears here"}</p>
      </div>
    </div>
  );
};

export default About;
