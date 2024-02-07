import { db } from "@/utilities/database";
import { getSelf } from "./auth-services";

export const getRecommended = async () => {
  let userId: string | null;
  try {
    const self = await getSelf();
    if (!self) {
      console.log("Unauthorized Request");
      return [];
    }
    userId = self.id;
  } catch (error) {
    userId = null;
  }

  let users = [];
  if (userId) {
    users = await db.user.findMany({
      where: {
        AND: [
          {
            NOT: {
              followedBy: {
                some: {
                  followerId: userId,
                },
              },
            },
          },

          {
            NOT: {
              blockedBy: {
                none: {
                  blockedId: userId,
                },
              },
            },
          },

          {
            NOT: {
              blocking: {
                some: {
                  blockedId: userId,
                },
              },
            },
          },
        ],
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return users.filter((user) => user.id !== userId);
  } else {
    users = await db.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  return users;
};
