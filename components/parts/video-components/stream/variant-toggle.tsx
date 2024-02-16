"use client";

import { MessageSquare, Users } from "lucide-react";
import Hint from "@/app/(browse)/_components/sidebar/hint";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { ChatSidebarContext, ChatType } from "@/context/chat-sidebar-context";
interface VariantToggleProps {}

const ToggleChatVariant = ({}: VariantToggleProps) => {
  const { type, onChangeType } = useContext(ChatSidebarContext) || {};

  const isChat = ChatType.CHAT;
  let Icon = type === isChat ? Users : MessageSquare;
  const label = type === ChatType.CHAT ? "Community" : "Back to Chat";

  const onToggle = () => {
    const newVariant =
      type === ChatType.CHAT ? ChatType.COMMUNITY : ChatType.CHAT;
    onChangeType?.(newVariant);
  };

  return (
    <Hint label={label} side="left" asChild>
      <Button
        onClick={onToggle}
        variant={"ghost"}
        className={
          "h-auto p-2 hover:bg-white/10 hover:text-primary bg-transparent"
        }
      >
        <Icon className="h-4 w-4" />
      </Button>
    </Hint>
  );
};

export default ToggleChatVariant;
