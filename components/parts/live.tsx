"use client";
import { cn } from "@/lib/utils";

interface LiveProps {
  className?: string;
}

const Live = ({ className }: LiveProps) => {
  return (
    <div
      className={cn(
        "bg-rose-500 text-center p-0.2 px-1.5 rounded-md uppercase text-[10px] border border-background font-semibold -tracking-wide",
        className
      )}
    >
      Live
    </div>
  );
};

export default Live;
