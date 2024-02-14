import React from "react";
import URLCard from "./_components/urlcard";
import KeyCard from "./_components/key-card";
import { getSelf } from "@/services/auth-services";
import { getStreamByUserId } from "@/services/stream-service";
import ConnectModal from "./_components/connect-modal";

const Keys = async () => {
  const self = await getSelf();
  const stream = await getStreamByUserId(self?.id!);
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Keys and URLs</h1>
        <ConnectModal />
      </div>
      <div className="space-y-4">
        <URLCard value={stream?.serverURL!} />
        <KeyCard value={stream?.streamKey!} />
      </div>
    </div>
  );
};

export default Keys;
