"use client";

import { useMemo } from "react";
import { Info } from "lucide-react";
import Hint from "@/app/(browse)/_components/sidebar/hint";

interface ChatInfoProps {
  isDelayed: boolean;
  isPrivate: boolean;
}

const ChatInfo = ({ isDelayed, isPrivate }: ChatInfoProps) => {
  const hint = useMemo(() => {
    if (isPrivate && !isDelayed) {
      return "Only followers can chat";
    }
    if (isDelayed && !isPrivate) {
      return "Messages are delayed by 3 seconds";
    }
    if (isDelayed && isPrivate) {
      return "Only followers can chat , messages are delayed y 3 seconds";
    }

    return "";
  }, [isDelayed, isPrivate]);

  const label = useMemo(() => {
    if (isPrivate && !isDelayed) {
      return "Followers Only";
    }
    if (isDelayed && !isPrivate) {
      return "Slow Mode";
    }
    if (isDelayed && isPrivate) {
      return "Followers Only , Slow Mode Enabled";
    }

    return "";
  }, [isDelayed, isPrivate]);

  if (!isDelayed && !isPrivate) {
    return null;
  }

  return (
    <div className="p-2 text-muted-foreground bg-white/5 border border-white/10 w-full rounded-t-md flex items-center gap-x-2">
      <Hint label={hint} asChild>
        <Info className="h-4 w-4" />
      </Hint>
      <p className="text-xs font-semibold"></p>
      {label}
    </div>
  );
};

export default ChatInfo;
