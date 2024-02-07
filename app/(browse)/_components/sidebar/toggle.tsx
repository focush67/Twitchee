"use client";

import { Button } from "@/components/ui/button";
import { SidebarContext } from "@/context/sidebar-context";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import React from "react";
import { useContext } from "react";
import Hint from "./hint";

const Toggle = () => {
  const { isOpen, onCollapse, onExpand } = useContext(SidebarContext) || {};

  return (
    <>
      {isOpen && (
        <div className="hidden lg:flex w-full items-center pt-4 mb-4 justify-center">
          <Hint label="Collapse" side="left" asChild>
            <Button variant="ghost" className="p-2 h-auto" onClick={onCollapse}>
              <ArrowLeftFromLine className="h-4 w-4" />
            </Button>
          </Hint>
        </div>
      )}
      {!isOpen && (
        <div className="hidden lg:flex w-full items-center pt-4 mb-4 justify-center">
          <p className="font-semibold text-primary"></p>
          <Hint label="Expand" side="right" asChild>
            <Button
              className="h-auto p-2 ml-auto"
              variant="ghost"
              onClick={onExpand}
            >
              <ArrowRightFromLine className="h-4 w-4" />
            </Button>
          </Hint>
        </div>
      )}
    </>
  );
};

export default Toggle;
