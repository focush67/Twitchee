"use client";

import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useTransition } from "react";
import { updateStream } from "@/server_actions/stream";
import { Skeleton } from "@/components/ui/skeleton";

type Field = "isChatEnabled" | "isChatDelayed" | "isChatPrivate";

interface ToggleProps {
  field: Field;
  label: string;
  value: boolean;
}

const Toggle = ({ field, label, value = false }: ToggleProps) => {
  const [isPending, startTransition] = useTransition();
  const onChange = () => {
    startTransition(() => {
      updateStream({ [field]: !value })
        .then(() => toast.success(`Settings Updated`))
        .catch(() => toast.error("Error"));
    });
  };

  return (
    <div className="p-6 bg-muted rounded-xl">
      <div className="flex items-center justify-between">
        <p className="font-semibold shrink-0">{label}</p>
        <div className="space-y-2">
          <Switch
            checked={value}
            onCheckedChange={onChange}
            disabled={isPending}
          >
            {value ? "On" : "Off"}
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Toggle;

export const ToggleSkeleton = () => {
  return <Skeleton className="rounded-xl w-full p-10" />;
};
