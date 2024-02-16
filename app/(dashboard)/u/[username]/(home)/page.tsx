import StreamPlayer from "@/components/parts/video-components/stream";
import { getSpecificUser } from "@/services/auth-services";
import { currentUser } from "@clerk/nextjs";

interface CreatorPageProps {
  params: {
    username: string;
  };
}

const CreatorHome = async ({ params }: CreatorPageProps) => {
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
};

export default CreatorHome;
