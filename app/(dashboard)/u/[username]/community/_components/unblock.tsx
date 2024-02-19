"use client";

import { useTransition } from "react";
import { onUnBlock } from "@/server_actions/block";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Loader, MinusCircle } from "lucide-react";

interface UnBlockButtonProps {
  userId: string;
}

const UnBlockButton = ({ userId }: UnBlockButtonProps) => {
  const [isPending, startTransition] = useTransition();

  const handleUnBlock = () => {
    startTransition(() => {
      onUnBlock(userId)
        .then((data) => toast.success(`Unblocked ${data.blocked.username}`))
        .catch(() => toast.error("Error Unblocking"));
    });
  };
  return (
    <Button
      size={"sm"}
      variant="ghost"
      disabled={isPending}
      onClick={handleUnBlock}
    >
      {isPending ? <Loader className="animate-spin" /> : <MinusCircle />}
    </Button>
  );
};

export default UnBlockButton;
