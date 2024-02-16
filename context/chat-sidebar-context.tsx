"use client";
import { ReactNode, createContext, useState } from "react";

export enum ChatType {
  CHAT = "CHAT",
  COMMUNITY = "COMMUNITY",
}

interface ChatSidebarProps {
  collapsed: boolean;
  type: ChatType;
  onCollapse: () => void;
  onExpand: () => void;
  onChangeType: (type: ChatType) => void;
}

export const ChatSidebarContext = createContext<ChatSidebarProps | undefined>(
  undefined
);

export const ChatSidebarProvider = ({ children }: { children: ReactNode }) => {
  const [collapsed, setIsCollapsed] = useState(false);
  const [type, setType] = useState<ChatType>(ChatType.CHAT);
  const onExpand = () => setIsCollapsed(false);
  const onCollapse = () => setIsCollapsed(true);
  const onChangeType = (chatType: ChatType) => setType(chatType);
  return (
    <ChatSidebarContext.Provider
      value={{ collapsed, onExpand, onCollapse, type, onChangeType }}
    >
      {children}
    </ChatSidebarContext.Provider>
  );
};
