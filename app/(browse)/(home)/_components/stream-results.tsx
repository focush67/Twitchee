import { getSelf } from "@/services/auth-services";
import { db } from "@/utilities/database";
import ResultCard, { ResultSCardkeleton } from "../_components/result-card";
import { Skeleton } from "@/components/ui/skeleton";
import { revalidatePath } from "next/cache";
interface StreamsProps {}

const Streams = async ({}: StreamsProps) => {
  const self = await getSelf();
  let streams = [];

  streams = await db.stream.findMany({
    where: {
      user: {
        NOT: {
          blocking: {
            some: {
              blockedId: self?.id,
            },
          },
        },
      },
    },
    select: {
      id: true,
      user: true,
      cover: true,
      name: true,
      isLive: true,
    },
    orderBy: [
      {
        isLive: "desc",
      },
      {
        updatedAt: "desc",
      },
    ],
  });

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Recommended Streams</h2>
      {streams.length === 0 && (
        <div className="text-muted-foreground text-xl">No Streams </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {streams?.map((stream) => (
          <ResultCard key={stream.id} data={stream} />
        ))}
      </div>
    </div>
  );
};

export default Streams;

export const StreamsSkeleton = () => {
  return (
    <div>
      <Skeleton className="h-8 w-[300px] mb-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[...Array(4)].map((_, index) => (
          <ResultSCardkeleton key={index} />
        ))}
      </div>
    </div>
  );
};
