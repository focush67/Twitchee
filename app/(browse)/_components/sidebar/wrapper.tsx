"use client";

import { SidebarContext } from "@/context/sidebar-context";
import { LayoutProps } from "@/types/layout";
import { useContext } from "react";
import { cn } from "@/lib/utils";

const Wrapper = ({ children }: LayoutProps) => {
  const { isOpen } = useContext(SidebarContext) || {};
  return (
    <aside
      className={cn(
        "fixed left-0 flex flex-col w-60 h-full bg-background border-r border-[#252731] z-50",
        !isOpen
          ? "w-[70px] transition-all ease-in-out duration-300"
          : "w-60 transition-all ease-in-out duration-300"
      )}
    >
      {children}
    </aside>
  );
};

export default Wrapper;
