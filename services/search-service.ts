import { db } from "@/utilities/database";
import { getSelf } from "./auth-services";
import { Stream } from "@prisma/client";

export const getSearch = async (term?: string) => {
  if (!term) {
    return null;
  }

  let userId;
  try {
    const self = await getSelf();
    if (!self) {
      console.log("Self not found at search service");
      return [];
    }
    userId = self?.id;
  } catch (error) {
    userId = null;
    return [];
  }

  let streams = [];

  if (userId) {
    streams = await db.stream.findMany({
      where: {
        OR: [
          {
            name: {
              contains: term,
            },
          },
          {
            user: {
              username: {
                contains: term,
              },
            },
          },
        ],
      },

      select: {
        user: true,
        id: true,
        name: true,
        isLive: true,
        cover: true,
        updatedAt: true,
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
      where: {
        OR: [
          {
            name: {
              contains: term,
            },
          },
          {
            user: {
              username: {
                contains: term,
              },
            },
          },
        ],
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
  }

  return streams;
};
