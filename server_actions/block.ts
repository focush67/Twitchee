"use server";

import { getSelf } from "@/services/auth-services";
import { BlockUser, UnBlockUser } from "@/services/blocking-service";
import { RoomServiceClient } from "livekit-server-sdk";
import { revalidatePath } from "next/cache";

const url = process.env.LIVEKIT_API_URL || "";
const key = process.env.LIVEKIT_API_KEY || "";
const secret = process.env.LIVEKIT_API_SECRET || "";

const Room = new RoomServiceClient(url, key, secret);

export const onBlock = async (id: string) => {
  const self = await getSelf();
  if (!self) {
    throw new Error("Cannot initiate block as you need to be logged in");
  }

  let blockedUser;
  try {
    blockedUser = await BlockUser(id);
  } catch (error) {}

  try {
    await Room.removeParticipant(self.id, id);
  } catch (error) {}
  revalidatePath("/");
  revalidatePath(`/u/${self.username}/community`);
};

export const onUnBlock = async (id: string) => {
  const unblockedUser = await UnBlockUser(id);
  revalidatePath("/");
  if (unblockedUser) {
    revalidatePath(`/${unblockedUser.blocked.username}`);
  }
  return unblockedUser;
};
