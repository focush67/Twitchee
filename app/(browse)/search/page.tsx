import { redirect } from "next/navigation";
import SearchResults from "./_components/search-results";

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
      <SearchResults term={term} />
    </div>
  );
};

export default SearchPage;
