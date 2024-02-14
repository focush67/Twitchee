"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { ToggleSkeleton } from "./_components/toggle";
const Loading = () => {
  return (
    <div className="p-6 space-y-4">
      <Skeleton className="h-10 w-[200px]" />
      <div className="space-y-4">
        <ToggleSkeleton />
        <ToggleSkeleton />
        <ToggleSkeleton />
      </div>
    </div>
  );
};

export default Loading;
