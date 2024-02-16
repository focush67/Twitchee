"use client";

import { Separator } from "@/components/ui/separator";
import { Pencil } from "lucide-react";
import Image from "next/image";
import InfoModal from "./info-modal";

interface InfoCardProps {
  hostId: string;
  viewerId: string;
  name: string;
  thumbnail: string | null;
}

const InfoCard = ({ hostId, name, thumbnail, viewerId }: InfoCardProps) => {
  const hostAsViewer = `host-${hostId}`;
  const isHost = viewerId === hostAsViewer;

  if (!isHost) return null;
  return (
    <div className="px-4">
      <div className="rounded-xl bg-backgroud">
        <div className="flex items-center gap-x-2 p-4">
          <div className="rounded-md bg-blue-600 h-auto w-auto p-2">
            <Pencil className="h-5 w-5" />
          </div>
          <div>
            <h2 className="capitalize text-sm lg:text-lg font-semibold">
              Edit Stream Info
            </h2>
            <p className="text-xs lg:text-sm text-muted-foreground">
              Maximize Visibility
            </p>
          </div>
          <InfoModal initialName={name} initialThumbnail={thumbnail} />
        </div>
        <Separator />
        <div className="p-4 lg:p-6 space-y-4">
          <div>
            <h3 className="text-sm text-muted-foreground mb-2">Name</h3>
            <p className="text-sm font-semibold">{name}</p>
          </div>
          <div>
            <h3 className="text-sm text-muted-foreground mb-2">Thumbnail</h3>
            {thumbnail && (
              <div className="relative aspect-video rounded-md overflow-hidden w-[200px] border border-white/10">
                <Image
                  fill
                  src={thumbnail}
                  alt="Stream Name"
                  className="object-contain"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
