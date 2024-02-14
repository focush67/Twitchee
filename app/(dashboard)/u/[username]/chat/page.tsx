import { getSelf } from "@/services/auth-services";
import { getStreamByUserId } from "@/services/stream-service";
import Toggle from "./_components/toggle";

const ChatPage = async () => {
  const self = await getSelf();
  const stream = await getStreamByUserId(self?.id!);
  if (!stream) {
    throw new Error("No Stream Found");
  }
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Chat Settings</h1>
      </div>
      <div className="space-y-4">
        <Toggle
          field={"isChatEnabled"}
          label={"Enable Chat"}
          value={stream.isChatEnabled}
        />
        <Toggle
          field={"isChatDelayed"}
          label={"Delay Chat"}
          value={stream.isChatDelayed}
        />
        <Toggle
          field={"isChatPrivate"}
          label={"Followers Only Chat"}
          value={stream.isChatPrivate}
        />
      </div>
    </div>
  );
};

export default ChatPage;
