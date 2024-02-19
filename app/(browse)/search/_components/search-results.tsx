import { Skeleton } from "@/components/ui/skeleton";
import { getSearch } from "@/services/search-service";
import { SearchResultCard } from "./search-card";

interface SearchResultsProps {
  term?: string;
}

const SearchResults = async ({ term }: SearchResultsProps) => {
  const data = await getSearch(term);
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Results for {term}</h2>
      {data?.length === 0 && (
        <p className="text-muted-foreground text-sm">
          No results found for the query
        </p>
      )}
      <div className="flex flex-col gap-y-4">
        {data?.map((result) => (
          <SearchResultCard key={result.id} data={result} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;

export const SearchResultsSkeleton = () => {
  return (
    <div>
      <Skeleton className="h-8 w-[290px] mb-4" />
      <div className="flex flex-col gap-y-4">
        {[...Array(4)].map((_, index: number) => (
          <SearchResultsSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};
