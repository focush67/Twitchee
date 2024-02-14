import { db } from "@/utilities/database";
import { getSelf } from "./auth-services";

export const isFollowingUser = async (id: string) => {
  try {
    const self = await getSelf();
    const target = await db.user.findUnique({
      where: {
        id,
      },
    });
    if (!target) {
      throw new Error("Followed User not found");
    }

    if (!self) {
      throw new Error("Unauthorized Request");
    }

    if (target.id === self.id) {
      return true;
    }

    const existingFollow = await db.follow.findFirst({
      where: {
        followerId: self.id,
        followingId: target.id,
      },
    });

    return !!existingFollow;
  } catch {
    return false;
  }
};

export const FollowUser = async (id: string) => {
  const self = await getSelf();
  const target = await db.user.findUnique({
    where: {
      id,
    },
  });

  if (!target) {
    throw new Error("User to be Followed not found");
  }

  if (!self) {
    throw new Error("Unauthorized Request");
  }

  if (target.id === self.id) {
    throw new Error("Can't follow yourself");
  }

  const followStatus = await db.follow.findFirst({
    where: {
      followerId: self.id,
      followingId: target.id,
    },
  });

  if (followStatus) {
    throw new Error("Already Following");
  }

  const followRequest = await db.follow.create({
    data: {
      followerId: self.id,
      followingId: target.id,
    },
    include: {
      following: true,
      follower: true,
    },
  });

  return followRequest;
};

export const getFollowedUsers = async () => {
  try {
    const self = await getSelf();
    if (!self) {
      throw new Error("Unauthorized Request");
    }
    const followedUsersList = db.follow.findMany({
      where: {
        followerId: self.id,
        following: {
          blocking: {
            none: {
              blockedId: self.id,
            },
          },
        },
      },
      include: {
        following: {
          include: {
            stream: true,
          },
        },
      },
    });
    return followedUsersList;
  } catch (error) {
    return [];
  }
};

export const UnfollowUser = async (id: string) => {
  const self = await getSelf();
  const target = await db.user.findUnique({
    where: {
      id,
    },
  });

  if (!target) {
    console.log("Target for unfollow 404");
    throw new Error("Unfollow user not found");
  }

  if (!self) {
    throw new Error("Unauthorized Request");
  }

  if (target.id === self.id) {
    throw new Error("Can't unfollow yourself");
  }

  const existingStatus = await db.follow.findFirst({
    where: {
      followerId: self.id,
      followingId: target.id,
    },
  });

  if (!existingStatus) {
    throw new Error("Already not following");
  }

  const followStatus = await db.follow.delete({
    where: {
      id: existingStatus.id,
    },
    include: {
      following: true,
    },
  });

  return followStatus;
};
