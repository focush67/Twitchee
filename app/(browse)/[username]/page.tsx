import { isFollowingUser } from "@/services/follow-services";
import { fetchUser } from "@/services/user-service";
import { notFound } from "next/navigation";
import { Actions } from "./_components/actions";
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
  const followStatus = await isFollowingUser(user.id);
  return (
    <div className="flex flex-col gap-4">
      User: {user.username}
      <Actions id={user.id} status={followStatus} />
    </div>
  );
};

export default UserPage;
