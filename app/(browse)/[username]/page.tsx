import { isFollowingUser } from "@/services/follow-services";
import { fetchUser } from "@/services/user-service";
import { notFound } from "next/navigation";
import { Actions } from "./_components/actions";
import { isBlockedByUser } from "@/services/blocking-service";
import { getSelf, getSpecificUser } from "@/services/auth-services";
import StreamPlayer from "@/components/parts/video-components/stream";
import { currentUser } from "@clerk/nextjs";
interface UserProps {
  params: {
    username: string;
  };
}

const UserPage = async ({ params }: UserProps) => {
  const { username } = params;
  const user = await getSpecificUser(username);

  if (!user || !user.stream) {
    notFound();
  }

  // TODO : Prevent blocked user from manually accessing this page through URL.
  const followStatus = await isFollowingUser(user.id);
  const { blockedStatus, blockAccess } = (await isBlockedByUser(user.id)) || {};
  console.log({ followStatus });
  if (blockAccess === true) {
    return notFound();
  }

  return (
    <StreamPlayer user={user} stream={user.stream} isFollowing={followStatus} />
  );
};

export default UserPage;

/*

const { username } = params;
  const landingUser = await currentUser();

  const user = await getSpecificUser(username);

  if (!user || user.externalUserId !== landingUser?.id || !user.stream) {
    throw new Error("Unauthorized");
  }

  return (
    <div className="h-full">
      <StreamPlayer user={user} stream={user.stream} isFollowing={true} />
    </div>
  );
*/
