"use client";
import { createContext, ReactNode, useState } from "react";

interface SidebarModalProps {
  isOpen: boolean;
  onExpand?: () => void;
  onCollapse?: () => void;
}

export const SidebarContext = createContext<SidebarModalProps | undefined>({
  isOpen: false,
});

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const onExpand = () => {
    setIsOpen(true);
  };
  const onCollapse = () => {
    setIsOpen(false);
  };
  return (
    <SidebarContext.Provider value={{ isOpen, onExpand, onCollapse }}>
      {children}
    </SidebarContext.Provider>
  );
};
