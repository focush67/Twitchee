import { db } from "@/utilities/database";
import { getSelf } from "./auth-services";

export const getAllStreams = async () => {
  console.log("Inside streams service");
  let userId: string | undefined;
  try {
    const self = await getSelf();
    if (!self) {
    }
    userId = self?.id;
  } catch (error) {
    userId = undefined;
  }
  console.log("Outside first ty-catch ", userId);
  let streams = [];
  console.log({ db });

  if (userId) {
    streams = await db.stream.findMany({
      where: {
        user: {
          NOT: {
            blocking: {
              some: {
                blockedId: userId,
              },
            },
          },
        },
      },
      include: {
        user: true,
      },
      orderBy: [
        {
          isLive: "desc",
        },
        {
          updatedAt: "desc",
        },
      ],
    });
  } else {
    streams = await db.stream.findMany({
      include: {
        user: true,
      },
      orderBy: [
        {
          isLive: "desc",
        },
        {
          updatedAt: "desc",
        },
      ],
    });
  }
  console.log("Returning streams ", streams);
  return streams;
};
