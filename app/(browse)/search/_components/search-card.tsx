"use client";

import { User } from "@prisma/client";
import Link from "next/link";
import { Thumbnail, ThumbnailSkeleton } from "../../_components/thumbnail";
import { VerifiedMark } from "@/components/parts/verified";
import { formatDistanceToNow } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

interface SearchResultCardProps {
  data: {
    id: string;
    name: string;
    cover: string | null;
    isLive: boolean;
    updatedAt: Date;
    user: User;
  };
}

export const SearchResultCard = ({ data }: SearchResultCardProps) => {
  return (
    <Link href={`/${data.user.username}`}>
      <div className="w-full flex gap-x-4">
        <div className="relative h-[9rem] w-[16rem]">
          <Thumbnail
            src={data.cover}
            fallbackUrl={data.user.imageUrl}
            isLive={data.isLive}
            username={data.user.username}
          />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-x-2">
            <p className="font-bold text-lg cursor-pointer hover:text-blue-800">
              {data.user.username}
            </p>
            <VerifiedMark />
          </div>
          <div className="text-sm text-muted-foreground">{data.name}</div>
          <div className="text-sm text-muted-foreground">
            {formatDistanceToNow(new Date(data.updatedAt), {
              addSuffix: true,
            })}
          </div>
        </div>
      </div>
    </Link>
  );
};

export const SearchCardSkeleton = () => {
  return (
    <div className="flex w-full gap-x-4">
      <div className="relative h-[9rem] w-[16rem]">
        <ThumbnailSkeleton />
        <div className="space-y-2">
          <Skeleton className="h-3 w-36" />
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-12" />
        </div>
      </div>
    </div>
  );
};
