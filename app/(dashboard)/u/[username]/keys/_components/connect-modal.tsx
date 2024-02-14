"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { IngressInput } from "livekit-server-sdk";
import { useState, useTransition, useRef, ElementRef } from "react";
import { createIngress } from "@/server_actions/ingress";
import { toast } from "sonner";

const RTMP = String(IngressInput.RTMP_INPUT);
const WHIP = String(IngressInput.WHIP_INPUT);

type IngressType = typeof RTMP | typeof WHIP;

interface ConnectModalProps {}

const ConnectModal = ({}: ConnectModalProps) => {
  const closeModalRef = useRef<ElementRef<"button">>(null);
  const [iType, setIType] = useState<IngressType>(RTMP);
  const [isPending, startTransition] = useTransition();

  const onSubmit = () => {
    startTransition(() => {
      createIngress(parseInt(iType))
        .then(() => {
          toast.success("Ingress created");
          closeModalRef?.current?.click();
        })
        .catch(() => toast.error("Failed to create Ingress"));
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"primary"}>Generate Connection</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate Connection</DialogTitle>
        </DialogHeader>
        <Select
          disabled={isPending}
          value={iType}
          onValueChange={(v) => setIType(v)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Ingress Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={RTMP}>RTMP</SelectItem>
            <SelectItem value={WHIP}>WHIP</SelectItem>
          </SelectContent>
        </Select>
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Warning!</AlertTitle>
          <AlertDescription>All current streams will be reset</AlertDescription>
        </Alert>
        <div className="flex justify-between">
          <DialogClose asChild>
            <Button variant={"ghost"} ref={closeModalRef}>
              Cancel
            </Button>
          </DialogClose>
          <Button variant={"primary"} onClick={onSubmit} disabled={isPending}>
            Generate
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConnectModal;
