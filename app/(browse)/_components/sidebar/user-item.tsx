"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SidebarContext } from "@/context/sidebar-context";
import { Skeleton } from "@/components/ui/skeleton";
import { useContext } from "react";
import Link from "next/link";
import UserAvatar from "@/components/parts/user-avatar";
import Live from "@/components/parts/live";

interface UserItemProps {
  username: string;
  imageUrl: string;
  isLive?: boolean;
}

const UserItem = ({ username, imageUrl, isLive }: UserItemProps) => {
  const pathname = usePathname();
  const { isOpen } = useContext(SidebarContext) || {};
  const rediretTo = `/${username}`;
  const isActive = pathname === rediretTo;
  return (
    <Button
      asChild
      variant={"ghost"}
      className={cn(
        "w-full h-12",
        !isOpen ? "justify-center" : "justify-start",
        isActive && "bg-accent"
      )}
    >
      <Link href={rediretTo}>
        <div
          className={cn(
            "flex items-center w-full gap-x-4",
            !isOpen && "justify-center"
          )}
        >
          <UserAvatar imageUrl={imageUrl} username={username} isLive={isLive} />
          {isOpen && <p className="truncate">{username}</p>}
          {isOpen && isLive && <Live className="ml-auto" />}
        </div>
      </Link>
    </Button>
  );
};

export default UserItem;

export const UserSkeleton = () => {
  return (
    <li className="flex items-center gap-x-4 px-3 py-2">
      <Skeleton className="min-h-[32px] min-w-[32px] rounded-full" />
      <div className="flex-1">
        <Skeleton className="h-6" />
      </div>
    </li>
  );
};
