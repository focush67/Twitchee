"use server";

import {
  IngressAudioEncodingPreset,
  IngressInput,
  IngressClient,
  IngressVideoEncodingPreset,
  RoomServiceClient,
  TrackSource,
  CreateIngressOptions,
  IngressVideoOptions,
  IngressAudioOptions,
} from "livekit-server-sdk";

import { db } from "@/utilities/database";
import { getSelf } from "@/services/auth-services";
import { revalidatePath } from "next/cache";

const url = process.env.LIVEKIT_API_URL || "";
const key = process.env.LIVEKIT_API_KEY || "";
const secret = process.env.LIVEKIT_API_SECRET || "";

const Room = new RoomServiceClient(url, key, secret);
const ingressClient = new IngressClient(url);

export const resetIngresses = async (hostIdentity: string) => {
  const ingresses = await ingressClient.listIngress({
    roomName: hostIdentity,
  });

  const rooms = await Room.listRooms([hostIdentity]);

  for (const room of rooms) {
    await Room.deleteRoom(room.name);
  }

  for (const i of ingresses) {
    if (i.ingressId) {
      await ingressClient.deleteIngress(i.ingressId);
    }
  }
};

export const createIngress = async (ingressType: IngressInput) => {
  const self = await getSelf();
  if (!self) {
    console.log("Unauthorized Request as self was not found");
  }

  await resetIngresses(self?.id!);
  let bypassTranscoding = false;
  let video: IngressVideoOptions | undefined;
  let audio: IngressAudioOptions | undefined;
  if (ingressType === IngressInput.WHIP_INPUT) {
    bypassTranscoding = true;
  } else {
    video = {
      source: TrackSource.CAMERA,
      encodingOptions: {
        value: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS,
        case: "preset",
      },
    } as IngressVideoOptions;

    audio = {
      source: TrackSource.MICROPHONE,
      encodingOptions: {
        value: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS,
        case: "preset",
      },
    } as IngressAudioOptions;
  }

  const options: CreateIngressOptions = {
    name: self?.username,
    roomName: self?.id,
    participantName: self?.username,
    participantIdentity: self?.id,
    bypassTranscoding: bypassTranscoding,
    video: video,
    audio: audio,
  };

  const ingress = await ingressClient.createIngress(ingressType, options);

  if (!ingress || !ingress.url || !ingress.streamKey) {
    throw new Error("Failed to create Ingress");
  }

  await db.stream.update({
    where: {
      userId: self?.id,
    },
    data: {
      ingressID: ingress.ingressId,
      serverURL: ingress.url,
      streamKey: ingress.streamKey,
    },
  });

  revalidatePath(`/u/${self?.username}/keys`);
  return ingress;
};
