"use server";

import { db } from "@/utilities/database";
import { Stream } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { getSelf } from "@/services/auth-services";

export const updateStream = async (values: Partial<Stream>) => {
  try {
    const self = await getSelf();
    const selfStream = await db.stream.findUnique({
      where: {
        userId: self?.id,
      },
    });
    if (!selfStream) {
      throw new Error(`Stream not found ${selfStream}`);
    }
    const validData = {
      cover: values.cover,
      name: values.name,
      isChatEnabled: values.isChatEnabled,
      isChatPrivate: values.isChatPrivate,
      isChatDelayed: values.isChatDelayed,
    };

    const stream = await db.stream.update({
      where: {
        userId: self?.id,
      },
      data: {
        ...validData,
      },
    });

    revalidatePath(`/u/${self?.username}/chat`);
    revalidatePath(`/u/${self?.username}`);
    revalidatePath(`/${self?.username}`);

    return stream;
  } catch (error) {
    throw new Error("Internal ERROR");
  }
};
