import { Stream, User } from "@prisma/client";
import Link from "next/link";
import { Thumbnail } from "../../_components/thumbnail";
import Live from "@/components/parts/live";
import UserAvatar, { UserAvatarSkeleton } from "@/components/parts/user-avatar";
import { Skeleton } from "@/components/ui/skeleton";

interface ResultProps {
  data: {
    user: User;
    isLive: boolean;
    name: string;
    cover: string | null;
  };
}

const ResultCard = ({ data }: ResultProps) => {
  console.log(`${data.user.username} : ${data.isLive}`);
  return (
    <Link href={`/${data.user.username}`}>
      <div className="h-full space-y-4 w-full">
        <Thumbnail
          src={data.cover}
          fallbackUrl={data.user.imageUrl}
          isLive={data.isLive}
          username={data.user.username}
        />
        {data.isLive && <Live />}
        <div className="flex gap-x-3">
          <UserAvatar
            username={data.user.username}
            imageUrl={data.user.imageUrl}
            isLive={data.isLive}
          />
          <div className="flex flex-col overflow-hidden">
            <p className="truncate font-semibold hover:text-blue-600">
              {data.name}
            </p>
            <p className="text-muted-foreground">{data.user.username}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ResultCard;

export const ResultSCardkeleton = () => {
  return (
    <div className="h-full w-full space-y-4">
      <Skeleton />
      <div className="flex gap-x-3">
        <UserAvatarSkeleton />
        <div className="flex flex-col gap-y-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    </div>
  );
};
