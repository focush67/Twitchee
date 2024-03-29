"use client";

import { LayoutProps } from "@/types/layout";
import { SidebarContext } from "@/context/sidebar-context";
import { cn } from "@/lib/utils";
import { useContext } from "react";

const Container = ({ children }: LayoutProps) => {
  const { isOpen } = useContext(SidebarContext) || {};

  return (
    <div
      className={cn(
        "flex-1",
        !isOpen
          ? "ml-[70px] transition-all ease-in-out duration-200"
          : "ml-[70px] lg:ml-60 transition-all ease-in-out duration-200"
      )}
    >
      {children}
    </div>
  );
};

export default Container;
