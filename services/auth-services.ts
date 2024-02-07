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
  });

  if (!user) {
    throw new Error("User not found");
  }

  if (self.username !== user.username) {
    throw new Error("Unauthorized");
  }

  return user;
};
