"use server";

import { v4 } from "uuid";
import { AccessToken } from "livekit-server-sdk";
import { getSelf } from "@/services/auth-services";
import { fetchUserById } from "@/services/user-service";
import { isBlockedByUser } from "@/services/blocking-service";

export const createViewerToken = async (hostId: string) => {
  let self;
  try {
    self = await getSelf();
    if (!self) {
      const id = v4();
      const username = `guest#${Math.floor(Math.random() * 1000)}`;
      self = { id, username };
    }
  } catch {
    console.log("Error in creating viewer token");
  }

  const host = await fetchUserById(hostId);
  if (!host) {
    throw new Error("User not found");
  }

  const { blockedStatus } = (await isBlockedByUser(host.id)) || {};

  if (blockedStatus) {
    throw new Error("You are blocked from watching this stream");
  }

  const isHost = self?.id === host.id;

  const key = process.env.LIVEKIT_API_KEY || "";
  const secret = process.env.LIVEKIT_API_SECRET || "";

  const token = new AccessToken(key, secret, {
    identity: isHost ? `host-${self?.id}` : `${self?.id}`,
    name: self?.username,
  });

  token.addGrant({
    room: host.id,
    roomJoin: true,
    canPublish: false,
    canPublishData: true,
  });

  return await Promise.resolve(token.toJwt());
};
