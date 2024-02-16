"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { onFollow, onUnfollow } from "@/server_actions/follow";
import { useAuth } from "@clerk/nextjs";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
interface ActionsProps {
  isFollowing: boolean;
  hostId: string;
  isHost: boolean;
}

const Actions = ({ isFollowing, hostId, isHost }: ActionsProps) => {
  const { userId } = useAuth();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const followHost = () => {
    startTransition(() => {
      onFollow(hostId)
        .then((data) => toast.success(`Followed ${data.following.username}`))
        .catch(() => toast.error(`Some error occured while following`));
    });
  };

  const unfollowHost = () => {
    startTransition(() => {
      onUnfollow(hostId)
        .then((data) => toast.success(`UnFollowed ${data.following.username}`))
        .catch(() => toast.error(`Some error occured while unfollowing `));
    });
  };

  const handleRelationship = () => {
    if (!userId) {
      return router.push("/sign-in");
    }

    if (isHost) {
      return;
    }

    if (isFollowing) {
      followHost();
    } else {
      unfollowHost();
    }
  };

  return (
    <Button
      disabled={isPending || isHost}
      className="w-full lg:w-auto"
      size={"sm"}
      onClick={handleRelationship}
      variant={"primary"}
    >
      <Heart
        className={cn("h-4 w-4 mr-2", isFollowing ? "fill-white" : "fill-none")}
      />
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};

export default Actions;

export const ActionsSkeleton = () => {
  return <Skeleton className="h-10 w-full lg:w-24" />;
};
