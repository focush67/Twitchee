"use client";

import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useParticipants } from "@livekit/components-react";
import { useMemo, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import CommunityItem from "./community-item";
import { LocalParticipant, RemoteParticipant } from "livekit-client";

interface ChatCommunityProps {
  viewer: string;
  host: string;
  isHidden: boolean;
}

const ChatCommunity = ({ viewer, host, isHidden }: ChatCommunityProps) => {
  const participants = useParticipants();
  const [value, setValue] = useState("");
  const debouncedValue = useDebounceValue(value, 500);

  const onChange = (newValue: string) => {
    setValue(newValue);
  };

  const filterUser = useMemo(() => {
    const deduped = participants.reduce((acc, party) => {
      const hostAsViewer = `host-${party.identity}`;
      if (!acc.some((p) => p.identity === hostAsViewer)) {
        acc.push(party);
      }
      return acc;
    }, [] as (RemoteParticipant | LocalParticipant)[]);

    return deduped.filter((p) => {
      return p.name?.toLowerCase().includes(debouncedValue[0].toLowerCase());
    });
  }, [participants, debouncedValue]);

  if (isHidden) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-muted-foreground">Community is disabled</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <Input
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search Commnity"
        className="border-white/10"
      />
      <ScrollArea className="gap-y-2 mt-4">
        <p className="p-2 text-center text-sm text-muted-foreground hidden last:block">
          No results
        </p>
        {filterUser.map((party, index) => (
          <CommunityItem
            key={index}
            host={host}
            viewer={viewer}
            participant={party.identity}
            partyName={party.name}
          />
        ))}
      </ScrollArea>
    </div>
  );
};

export default ChatCommunity;
