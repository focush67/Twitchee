"use client";

import { SidebarContext } from "@/context/sidebar-context";
import { User } from "@prisma/client";
import { useContext } from "react";
import UserItem, { UserSkeleton } from "./user-item";

interface RecommendedUsersProps {
  data: User[];
}

const RecommendedUsers = ({ data }: RecommendedUsersProps) => {
  const { isOpen } = useContext(SidebarContext) || {};
  const showLabel = isOpen && data?.length > 0;
  return (
    <div>
      {showLabel && (
        <div className="pl-6 mb-4">
          <p className="text-sm text-muted-foreground">Recommended</p>
        </div>
      )}
      <ul className="space-y-2 px-2">
        {data.map((user) => (
          <UserItem
            key={user.id}
            username={user.username}
            imageUrl={user.imageUrl}
            isLive={false}
          />
        ))}
      </ul>
    </div>
  );
};

export default RecommendedUsers;

export const RecommendedSkeleton = () => {
  return (
    <ul className="px-2">
      {[...Array(3)].map((_, index) => (
        <UserSkeleton key={index} />
      ))}
    </ul>
  );
};
