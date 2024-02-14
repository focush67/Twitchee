"use client";

import { Input } from "@/components/ui/input";
import CopyComponent from "./copy";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface KeyCardProps {
  value: string | null;
}

const KeyCard = ({ value }: KeyCardProps) => {
  const [show, setShow] = useState(false);
  return (
    <div className="rounded-xl bg-muted p-6">
      <div className="flex items-start gap-x-10">
        <p className="font-semibold shrink-0">Stream Key</p>
        <div className="space-y-2 w-full">
          <div className="w-full flex items-center gap-x-2">
            <Input
              value={value || ""}
              type={show ? "password" : "text"}
              disabled
              placeholder="Stream Key"
            />
            <CopyComponent value={value} />
          </div>
          <Button size={"sm"} variant={"link"} onClick={() => setShow(!show)}>
            {show ? "Show" : "Hide"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default KeyCard;
