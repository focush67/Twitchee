"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import qs from "query-string";
import { useState } from "react";
import { SearchIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";

const Search = () => {
  const router = useRouter();
  const [value, setValue] = useState<string>("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value) {
      return;
    }
    const url = qs.stringifyUrl(
      {
        url: "/search",
        query: { term: value },
      },
      {
        skipEmptyString: true,
      }
    );

    router.push(url);
  };

  const clearInput = () => {
    setValue("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full lg:w-[400px] flex items-center"
    >
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search"
        className="rounded-r-none 
        focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
      />
      {value && (
        <X
          className="absolute top-2.5 right-14 h-5 w-5 text-muted-foreground cursor-pointer hover:opacity-75 transition"
          onClick={clearInput}
        />
      )}
      <Button
        type="submit"
        size="sm"
        variant="secondary"
        className="rounded-l-none"
      >
        <SearchIcon className="h-5 text-muted-foreground w-5" />
      </Button>
    </form>
  );
};

export default Search;
