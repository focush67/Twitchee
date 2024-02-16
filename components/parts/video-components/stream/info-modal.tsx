"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useTransition, useRef, ElementRef } from "react";
import { updateStream } from "@/server_actions/stream";
import { toast } from "sonner";
import { UploadDropZone } from "@/utilities/uploadthing";
import { useRouter } from "next/navigation";
import Hint from "@/app/(browse)/_components/sidebar/hint";
import { Trash } from "lucide-react";
import Image from "next/image";

interface InfoModalProps {
  initialName: string;
  initialThumbnail: string | null;
}

const InfoModal = ({ initialName, initialThumbnail }: InfoModalProps) => {
  const [name, setName] = useState(initialName);
  const [cover, setCover] = useState(initialThumbnail);
  const [isPending, startTransition] = useTransition();
  const closeModalRef = useRef<ElementRef<"button">>(null);
  const router = useRouter();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    startTransition(() => {
      updateStream({ name: name })
        .then(() => {
          toast.success("Stream Settings updated");
          closeModalRef?.current?.click();
        })
        .catch(() =>
          toast.error("Something went wrong while updating stream settings")
        );
    });
  };

  const onRemoveThumbnail = () => {
    startTransition(() => {
      updateStream({ cover: null })
        .then(() => {
          toast.success("Thumbnail was removed");
          setCover("");
          closeModalRef.current?.click();
        })
        .catch(() => {
          toast.error("Could not remove thumbnail");
        });
    });
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={"link"} size={"sm"} className="ml-auto">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Stream Info</DialogTitle>
        </DialogHeader>
        <form className="space-y-14" onSubmit={onSubmit}>
          <div className="space-y-2">
            <Label>Name</Label>
            <Input
              placeholder="Stream Name"
              onChange={onChange}
              value={name}
              disabled={isPending}
            />
          </div>
          <div className="space-y-2">
            <Label>Thumbnail</Label>
            {cover ? (
              <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
                <div className="absolute top-2 right-2 z-[10]">
                  <Hint asChild label="Remove Thumbnail" side="left">
                    <Button
                      type="button"
                      disabled={isPending}
                      onClick={onRemoveThumbnail}
                      className="h-auto w-auto p-1.5"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </Hint>
                </div>
                <Image
                  src={cover}
                  alt="Thumbnail"
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="rounded-xl border outline-dashed outline-muted">
                <UploadDropZone
                  endpoint="thumbnailUploader"
                  appearance={{
                    label: {
                      color: "#ffffff",
                    },
                    allowedContent: {
                      color: "#ffffff",
                    },
                  }}
                  onClientUploadComplete={(res) => {
                    setCover(res?.[0]?.url);
                    router.refresh();
                    closeModalRef.current?.click();
                  }}
                ></UploadDropZone>
              </div>
            )}
          </div>
          <div className="flex justify-between">
            <DialogClose asChild ref={closeModalRef}>
              <Button type="button" variant={"ghost"}>
                Cancel
              </Button>
            </DialogClose>
            <Button variant={"primary"} type="submit" disabled={isPending}>
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InfoModal;
