"use client";

import { StreamSkeleton } from "@/components/parts/video-components/stream";

const CreatorLoading = () => {
  return (
    <div className="h-full">
      <StreamSkeleton />
    </div>
  );
};

export default CreatorLoading;
