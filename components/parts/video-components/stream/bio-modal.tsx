"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ElementRef, useRef, useState, useTransition } from "react";
import { Textarea } from "@/components/ui/textarea";
import { updateUser } from "@/server_actions/user";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface BioModalProps {
  initial: string | null;
}

const BioModal = ({ initial }: BioModalProps) => {
  console.log({ initial });
  const closeModalRef = useRef<ElementRef<"button">>(null);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState(initial);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(() => {
      updateUser({ bio: value })
        .then(() => {
          toast.success("User Bio Updated");
          closeModalRef?.current?.click();
          router.refresh();
        })
        .catch(() =>
          toast.error("Something went wrong while updating user bio")
        );
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"link"} size={"sm"} className="ml-auto">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User Bio</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <Textarea
            placeholder="User Bio"
            value={value || initial || ""}
            disabled={isPending}
            className="resize-none"
            onChange={(e) => setValue(e.target.value)}
          />
          <div className="flex justify-between">
            <DialogClose asChild ref={closeModalRef}>
              <Button type="button" variant={"ghost"}>
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={isPending} type="submit" variant={"primary"}>
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BioModal;
