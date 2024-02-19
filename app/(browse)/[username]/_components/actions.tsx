"use client";

import { Button } from "@/components/ui/button";
import { onBlock, onUnBlock } from "@/server_actions/block";
import { onFollow, onUnfollow } from "@/server_actions/follow";
import { useTransition } from "react";
import { toast } from "sonner";

interface ActionsProps {
  id: string;
  followStatus: boolean;
  blockStatus: boolean;
}

export const Actions = ({ id, followStatus, blockStatus }: ActionsProps) => {
  const [isPending, startTransition] = useTransition();

  const handleFollow = () => {
    startTransition(() => {
      onFollow(id)
        .then((data) =>
          toast.success(`Now following ${data.following.username}`)
        )
        .catch(() => toast.error("Error Following"));
    });
  };

  const handleUnFollow = () => {
    startTransition(() => {
      onUnfollow(id)
        .then((data) => toast.success(`Unfollowed ${data.following.username}`))
        .catch(() => toast.error("Error Unfollowing"));
    });
  };

  const handleBlock = () => {
    startTransition(() => {
      onBlock(id)
        .then((data) => toast.success(`Blocked ${data?.blocked.username}`))
        .catch(() => toast.error("Error Blocking"));
    });
  };

  const handleUnBlock = () => {
    startTransition(() => {
      onUnBlock(id)
        .then((data) => toast.success(`Unblocked ${data.blocked.username}`))
        .catch(() => toast.error("Error Unblocking"));
    });
  };

  const relationShip = () => {
    if (followStatus) {
      handleUnFollow();
    } else {
      handleFollow();
    }
  };

  const restrict = () => {
    if (blockStatus) {
      handleUnBlock();
    } else {
      handleBlock();
    }
  };

  const followButtonVariant = followStatus ? "destructive" : "primary";

  const blockedButtonStatus = blockStatus ? "secondary" : "destructive";

  return (
    <>
      <Button
        disabled={blockStatus || isPending}
        variant={followButtonVariant}
        onClick={relationShip}
      >
        {followStatus ? "Unfollow" : "Follow"}
      </Button>

      <Button
        variant={blockedButtonStatus}
        onClick={restrict}
        disabled={isPending}
      >
        {blockStatus ? "Unblock" : "Block"}
      </Button>
    </>
  );
};
