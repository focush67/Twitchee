import { db } from "@/utilities/database";
import { getSelf } from "./auth-services";

export const getRecommended = async () => {
  let userId;
  try {
    const self = await getSelf();
    userId = self.id;
  } catch (error) {
    userId = null;
  }

  let users = [];
  if (userId) {
    users = await db.user.findMany({
      where: {
        NOT: {
          followedBy: {
            some: {
              followerId: userId,
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } else {
    users = await db.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  return users;
};
