"use client";

import { ReceivedChatMessage } from "@livekit/components-react";
import ChatMessage from "./chat-message";
import { Skeleton } from "@/components/ui/skeleton";

interface ChatListProps {
  messages: ReceivedChatMessage[];
  hidden: boolean;
  color: string;
}

const ChatList = ({ messages, hidden, color }: ChatListProps) => {
  if (hidden || !messages || messages.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-muted-foreground text-sm">
          {hidden ? "Chat is Disabled" : "Welcome to Chat"}
        </p>
      </div>
    );
  }
  return (
    <div className="flex flex-1 flex-col-reverse overflow-y-auto p-3 h-full">
      {messages.map((message) => (
        <ChatMessage key={message.timestamp} data={message} color={color} />
      ))}
    </div>
  );
};

export default ChatList;

export const ChatListSkeleton = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <Skeleton className="w-1/2 h-6" />
    </div>
  );
};
