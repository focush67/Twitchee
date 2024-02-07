"use server";

import { BlockUser, UnBlockUser } from "@/services/blocking-service";
import { revalidatePath } from "next/cache";

export const onBlock = async (id: string) => {
  // Adaption to chat features to be implemented here itself

  const blockedUser = await BlockUser(id);
  revalidatePath("/");
  if (blockedUser) {
    revalidatePath(`/${blockedUser.blocked.username}`);
  }
  return blockedUser;
};

export const onUnBlock = async (id: string) => {
  const unblockedUser = await UnBlockUser(id);
  revalidatePath("/");
  if (unblockedUser) {
    revalidatePath(`/${unblockedUser.blocked.username}`);
  }
  return unblockedUser;
};
