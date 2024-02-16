"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import ChatInfo from "./chat-info";
import React from "react";

interface ChatFormProps {
  onSubmit: () => void;
  onChange: (value: string) => void;
  isHidden: boolean;
  isPrivate: boolean;
  value: string;
  isDelayed: boolean;
  isFollowing: boolean;
}

const ChatForm = ({
  value,
  isDelayed,
  isFollowing,
  isHidden,
  isPrivate,
  onChange,
  onSubmit,
}: ChatFormProps) => {
  const [delayBlocked, setDelayBlocked] = useState(false);

  const isPrivateAndNotFollowing = isPrivate && !isFollowing;
  const isDisabled = isHidden || delayBlocked || isPrivateAndNotFollowing;
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!value || isDisabled) return;
    if (isDelayed || delayBlocked) {
      setDelayBlocked(true);
      setTimeout(() => {
        setDelayBlocked(false);
        onSubmit();
      }, 3000);
    } else {
      onSubmit();
    }
  };

  if (isHidden) {
    return null;
  }
  return (
    <form
      className="flex flex-col items-center gap-y-4 p-3"
      onSubmit={handleSubmit}
    >
      <div className="w-full">
        <ChatInfo isDelayed={isDelayed} isPrivate={isPrivate} />
        <Input
          onChange={(e) => {
            onChange(e.target.value);
          }}
          value={value}
          disabled={isDisabled}
          placeholder="Send Message"
          className={cn(
            "border-white/10",
            isPrivate && "rounded-t-none border-t-0"
          )}
        />
      </div>
      <div>
        <Button type="submit" variant={"primary"} size={"sm"} disabled={false}>
          Chat
        </Button>
      </div>
    </form>
  );
};

export default ChatForm;

export const ChatFormSkeleton = () => {
  return (
    <div className="flex flex-col items-center gap-y-4 p-3">
      <Skeleton className="w-full h-10" />
      <div className="flex items-center gap-x-2 ml-auto">
        <Skeleton className="h-7 w-7" />
        <Skeleton className="h-7 w-12" />
      </div>
    </div>
  );
};
