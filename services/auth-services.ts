import { currentUser } from "@clerk/nextjs";
import { db } from "../utilities/database";

export const getSelf = async () => {
  const self = await currentUser();
  if (!self || !self.username) {
    return null;
  }

  const user = await db.user.findUnique({
    where: {
      externalUserId: self.id,
    },
  });

  if (!user) {
    throw new Error("Not Found");
  }
  return user;
};

export const getSpecificUser = async (username: string) => {
  const self = await currentUser();
  if (!self || !self.username) {
    throw new Error("Unauthorized Request");
  }
  const user = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
      externalUserId: true,
      username: true,
      bio: true,
      imageUrl: true,
      _count: {
        select: {
          followedBy: true,
        },
      },
      stream: {
        select: {
          id: true,
          isLive: true,
          isChatDelayed: true,
          isChatEnabled: true,
          isChatPrivate: true,
          cover: true,
          name: true,
        },
      },
    },
  });

  if (!user) {
    return null;
  }

  return user;
};
