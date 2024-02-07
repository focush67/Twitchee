import { isFollowingUser } from "@/services/follow-services";
import { fetchUser } from "@/services/user-service";
import { notFound } from "next/navigation";
import { Actions } from "./_components/actions";
import { isBlockedByUser } from "@/services/blocking-service";
import { getSelf } from "@/services/auth-services";
interface UserProps {
  params: {
    username: string;
  };
}

const UserPage = async ({ params }: UserProps) => {
  const user = await fetchUser(params.username);
  if (!user) {
    throw notFound();
  }

  // TODO : Prevent blocked user from manually accessing this page through URL.
  const followStatus = await isFollowingUser(user.id);
  const { blockedStatus, blockAccess } = (await isBlockedByUser(user.id)) || {};

  if (blockAccess === true) {
    return notFound();
  }

  return (
    <div className="flex flex-col gap-4">
      <p>User: {user.username}</p>
      <p>Following: {followStatus ? "following" : "not following"}</p>
      <p> Blocked: {blockedStatus ? "blocked" : "not blocked"}</p>
      <Actions
        id={user.id}
        followStatus={followStatus}
        blockStatus={blockedStatus!}
      />
    </div>
  );
};

export default UserPage;
