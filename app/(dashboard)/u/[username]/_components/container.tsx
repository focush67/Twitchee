"use client";

import { LayoutProps } from "@/types/layout";
import { cn } from "@/lib/utils";
import { useContext } from "react";
import { CreatorSidebarContext } from "@/context/creator-sidebar-context";

const Container = ({ children }: LayoutProps) => {
  const { collapsed } = useContext(CreatorSidebarContext) || {};

  return (
    <div
      className={cn(
        "flex-1",
        collapsed
          ? "ml-[70px] transition-all ease-in-out duration-200"
          : "ml-[70px] lg:ml-60 transition-all ease-in-out duration-200"
      )}
    >
      {children}
    </div>
  );
};

export default Container;
