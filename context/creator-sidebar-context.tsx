"use client";
import { ReactNode, createContext, useState } from "react";

interface CreatorSidebarProps {
  collapsed: boolean;
  onCollapse: () => void;
  onExpand: () => void;
}

export const CreatorSidebarContext = createContext<
  CreatorSidebarProps | undefined
>(undefined);

export const CreatorSidebarProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [collapsed, setIsCollapsed] = useState(false);
  const onExpand = () => setIsCollapsed(false);
  const onCollapse = () => setIsCollapsed(true);
  return (
    <CreatorSidebarContext.Provider value={{ collapsed, onExpand, onCollapse }}>
      {children}
    </CreatorSidebarContext.Provider>
  );
};
