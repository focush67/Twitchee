"use client";

import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import Hint from "@/app/(browse)/_components/sidebar/hint";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { ChatSidebarContext } from "@/context/chat-sidebar-context";
interface ToggleChatProps {}

const ToggleChat = ({}: ToggleChatProps) => {
  const { collapsed, onCollapse, onExpand } =
    useContext(ChatSidebarContext) || {};

  let Icon = collapsed ? ArrowLeftFromLine : ArrowRightFromLine;
  const label = collapsed ? "Expand" : "Collapse";
  const onToggle = () => {
    if (collapsed) onExpand?.();
    else onCollapse?.();
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

export default ToggleChat;
