"use client";

import { SidebarContext } from "@/context/sidebar-context";
import { Follow, Stream, User } from "@prisma/client";
import { useContext } from "react";
import UserItem, { UserSkeleton } from "./user-item";

interface FollowingProps {
  data: (Follow & {
    following: User & {
      stream: Stream | null;
    };
  })[];
}

const Following = ({ data }: FollowingProps) => {
  const { isOpen } = useContext(SidebarContext) || {};

  if (!data.length) {
    return null;
  }

  return (
    <div>
      {isOpen && (
        <div className="pl-6 mb-4" id="following">
          <p className="text-sm text-muted-foreground">Following</p>
        </div>
      )}
      <ul className="space-y-2 px-2">
        {data.map((follow) => (
          <UserItem
            key={follow.following.id}
            username={follow.following.username}
            imageUrl={follow.following.imageUrl}
            isLive={follow.following.stream?.isLive}
          />
        ))}
      </ul>
    </div>
  );
};

export default Following;

export const FollowingSkeleton = () => {
  return (
    <ul className="px-2 pt-2 lg:pt-0">
      {[...Array(3)].map((_, index) => (
        <UserSkeleton key={index} />
      ))}
    </ul>
  );
};
