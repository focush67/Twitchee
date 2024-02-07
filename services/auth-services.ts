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
