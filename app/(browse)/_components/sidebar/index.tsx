import { getRecommended } from "@/services/recommended-services";
import RecommendedUsers, { RecommendedSkeleton } from "./recommended";
import Toggle from "./toggle";
import Wrapper from "./wrapper";
import { getFollowedUsers } from "@/services/follow-services";
import Following, { FollowingSkeleton } from "./following";
import { getSelf } from "@/services/auth-services";

const Sidebar = async () => {
  const users = await getRecommended();
  const followedUsers = await getFollowedUsers();
  const self = await getSelf();

  const recommendedUsers = users.filter((user) => user.id !== self.id);

  return (
    <Wrapper>
      <div className="space-y-4 pt-2 lg:pt-0">
        <Following data={followedUsers} />
        <br />
        <RecommendedUsers data={recommendedUsers} />
      </div>
      <Toggle />
    </Wrapper>
  );
};

export default Sidebar;

export const SidebarSkeleton = () => {
  return (
    <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50">
      <FollowingSkeleton />
      <RecommendedSkeleton />
    </aside>
  );
};
