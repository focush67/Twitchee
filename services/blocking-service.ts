import { db } from "@/utilities/database";
import { getSelf } from "./auth-services";

export const isBlockedByUser = async (id: string) => {
  try {
    const self = await getSelf();
    if (!self) {
      throw new Error("Unauthorized Request");
    }
    const target = await db.user.findUnique({
      where: {
        id,
      },
    });

    if (!target) {
      console.log("Blocking user not found 404");
    }

    if (target?.id === self.id) {
      console.log("Can't check youself blocked");
      return false;
    }

    const blockStatus = await db.block.findUnique({
      where: {
        blockerId_blockedId: {
          blockedId: target?.id!,
          blockerId: self.id!,
        },
      },
    });

    const permission = await db.block.findUnique({
      where: {
        blockerId_blockedId: {
          blockerId: target?.id!,
          blockedId: self.id,
        },
      },
    });
    return {
      blockedStatus: !!blockStatus,
      blockAccess: !!permission,
    };
  } catch (error) {
    return false;
  }
};

export const BlockUser = async (id: string) => {
  const self = await getSelf();
  if (!self) {
    throw new Error("Unauthorized Request");
  }
  if (self.id === id) {
    throw new Error("Can't block yourself");
  }
  const target = await db.user.findUnique({
    where: {
      id,
    },
  });

  if (!target) {
    throw new Error("User not found blocking");
  }

  const existingBlockStatus = await db.block.findUnique({
    where: {
      blockerId_blockedId: {
        blockerId: self.id,
        blockedId: target.id,
      },
    },
  });

  if (existingBlockStatus) {
    throw new Error("Already Blocked");
  }

  const block = await db.block.create({
    data: {
      blockerId: self.id,
      blockedId: target.id,
    },
    include: {
      blocked: true,
    },
  });

  return block;
};

export const UnBlockUser = async (id: string) => {
  const self = await getSelf();
  if (!self) {
    throw new Error("Unauthorized Request");
  }
  if (self.id === id) {
    throw new Error("Can't Unblock Yourself");
  }

  const target = await db.user.findUnique({
    where: {
      id,
    },
  });

  if (!target) {
    throw new Error("User not found to unblock");
  }

  const existingBlockingStatus = await db.block.findUnique({
    where: {
      blockerId_blockedId: {
        blockedId: target.id,
        blockerId: self.id,
      },
    },
  });

  if (!existingBlockingStatus) {
    throw new Error("User isnt blocked");
  }

  const unblock = await db.block.delete({
    where: {
      id: existingBlockingStatus.id,
    },
    include: {
      blocked: true,
    },
  });

  return unblock;
};
