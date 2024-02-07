"use client";

import { Button } from "@/components/ui/button";
import { onFollow, onUnfollow } from "@/server_actions/follow";
import { useTransition } from "react";
import { toast } from "sonner";

interface ActionsProps {
  id: string;
  status: boolean;
}

export const Actions = ({ id, status }: ActionsProps) => {
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

  const onClick = () => {
    if (status) {
      handleUnFollow();
    } else {
      handleFollow();
    }
  };

  const buttonVariant = status ? "destructive" : "primary";

  return (
    <Button disabled={isPending} variant={buttonVariant} onClick={onClick}>
      {status ? "Unfollow" : "Follow"}
    </Button>
  );
};
