import { getAllBlockedUsers } from "@/services/blocking-service";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { format } from "date-fns";

interface CommunityPageProps {}

const CommunityPage = async ({}: CommunityPageProps) => {
  const data = await getAllBlockedUsers();

  const formattedData = data.map((blockedUser) => ({
    ...blockedUser,
    userId: blockedUser.blocked.id,
    imageUrl: blockedUser.blocked.imageUrl,
    username: blockedUser.blocked.username,
    createdAt: format(new Date(blockedUser.blocked.createdAt), "dd/mm/yy"),
  }));

  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Community settings</h1>
      </div>
      <DataTable columns={columns} data={formattedData} />
    </div>
  );
};

export default CommunityPage;
