"use client";

import { toast } from "sonner";
import { useTransition } from "react";
import { MinusCircle } from "lucide-react";
import Hint from "@/app/(browse)/_components/sidebar/hint";
import { onBlock } from "@/server_actions/block";
import { cn } from "@/lib/utils";
import randomColor from "randomcolor";
import { Button } from "@/components/ui/button";

interface CommunityItemProps {
  host: string;
  viewer: string;
  participant: string;
  partyName: string | undefined;
}

const CommunityItem = ({
  host,
  viewer,
  participant,
  partyName,
}: CommunityItemProps) => {
  const [isPending, startTransition] = useTransition();
  const color = randomColor();
  const isSelf = partyName === viewer;
  const isHost = viewer === host;

  const handleBlock = () => {
    if (!partyName || isSelf || !isHost) return;
    startTransition(() => {
      onBlock(participant)
        .then(() => toast.success(`Blocked ${partyName}`))
        .catch(() => toast.error(`Could not block ${partyName}`));
    });
  };
  return (
    <div
      className={cn(
        "group flex items-center justify-between w-full p-2 rounded-md text-sm hover:bg-white/5"
      )}
    >
      <p
        style={{
          color: color,
        }}
      >
        {partyName}
      </p>
      {isHost && !isSelf && (
        <Hint label="Block" asChild>
          <Button
            variant={"ghost"}
            disabled={isPending}
            className="h-auto w-auto p-1 opacity-0 group-hover:opacity-100 transition"
            onClick={handleBlock}
          >
            <MinusCircle className="h-4 w-4 text-muted-foreground" />
          </Button>
        </Hint>
      )}
    </div>
  );
};

export default CommunityItem;
