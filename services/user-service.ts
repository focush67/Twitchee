import { db } from "@/utilities/database";

export const fetchUser = async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
  });

  return user;
};
