"use client";

import { Button } from "@/components/ui/button";
import { CheckCheck, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface CopyProps {
  value: string | null;
}

const CopyComponent = ({ value }: CopyProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const copyFunction = () => {
    if (!value) return;
    setIsCopied(true);
    navigator.clipboard.writeText(value);
    setTimeout(() => {
      setIsCopied(false);
      toast.success("Copied");
    }, 1000);
  };

  return (
    <Button
      disabled={!value && !isCopied}
      variant={"ghost"}
      size={"sm"}
      onClick={copyFunction}
    >
      {isCopied ? (
        <CheckCheck className="w-4 h-4 cursor-pointer" />
      ) : (
        <Copy className="w-4 h-4 cursor-pointer" />
      )}
    </Button>
  );
};

export default CopyComponent;
