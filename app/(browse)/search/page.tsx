import { redirect } from "next/navigation";
import SearchResults, {
  SearchResultsSkeleton,
} from "./_components/search-results";
import { Suspense } from "react";

interface SearchPageProps {
  searchParams: {
    term?: string;
  };
}

const SearchPage = ({ searchParams }: SearchPageProps) => {
  const { term } = searchParams;
  if (!term) {
    redirect("/");
  }
  return (
    <div className="h-full p-8 max-w-screen-2xl mx-auto">
      <Suspense fallback={<SearchResultsSkeleton />}>
        <SearchResults term={term} />
      </Suspense>
    </div>
  );
};

export default SearchPage;
