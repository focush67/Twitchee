"use server";

import { FollowUser, UnfollowUser } from "@/services/follow-services";
import { revalidatePath } from "next/cache";

export const onFollow = async (id: string) => {
  try {
    const user = await FollowUser(id);

    revalidatePath("/");
    if (user) {
      revalidatePath(`/${user.following.username}`);
    }
    return user;
  } catch (error) {
    throw new Error("Internal Server ERROR");
  }
};

export const onUnfollow = async (id: string) => {
  try {
    const user = await UnfollowUser(id);
    revalidatePath("/");
    if (user) {
      revalidatePath(`/${user.following.username}`);
    }
    return user;
  } catch (error: any) {
    console.log(error.message);
    throw new Error("Internal Server Error");
  }
};
