"use client";
import { cn } from "@/lib/utils";
import { CreatorSidebarContext } from "@/context/creator-sidebar-context";
import { LayoutProps } from "@/types/layout";
import { useContext } from "react";

const Wrapper = ({ children }: LayoutProps) => {
  const { collapsed } = useContext(CreatorSidebarContext) || {};
  return (
    <aside
      className={cn(
        "fixed left-0 flex flex-col w-60 h-full border-r bg-background z-50",
        collapsed
          ? "w-[70px] transition-all ease-in-out duration-300"
          : "w-60 transition-all ease-in-out duration-300"
      )}
    >
      {children}
    </aside>
  );
};

export default Wrapper;
