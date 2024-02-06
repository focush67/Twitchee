import { getRecommended } from "@/services/recommended-services";
import RecommendedUsers, { RecommendedSkeleton } from "./recommended";
import Toggle from "./toggle";
import Wrapper from "./wrapper";

const Sidebar = async () => {
  const recommended = await getRecommended();
  return (
    <Wrapper>
      <div className="space-y-4 pt-4 lg:pt-0">
        <RecommendedUsers data={recommended} />
      </div>
      <Toggle />
    </Wrapper>
  );
};

export default Sidebar;

export const SidebarSkeleton = () => {
  return (
    <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50">
      <RecommendedSkeleton />
    </aside>
  );
};
