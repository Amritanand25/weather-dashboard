import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (city: string) => void;
  onKeyup: (city: string) => void;
  value: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onKeyup,
  value,
}) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setQuery("");
    }
  };

  useEffect(() => {
    if (query !== value) setQuery(value);
  }, [value]);

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex justify-center items-center searchContainer"
    >
      <div className="relative group w-full">
        <input
          type="search"
          value={query}
          onChange={(e) => {
            let key = e.target.value;
            setQuery(key);
            onKeyup(key);
          }}
          placeholder="Search for a city..."
          className="search-input w-full px-4 py-3 pl-10 bg-gray-800/30 rounded-l-xl 
                   text-white placeholder-purple-300/50 focus:outline-none
                   backdrop-blur-md transition-all duration-300
                   group-hover:bg-gray-800/40"
        />
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400
                     group-hover:text-purple-300 transition-colors duration-300"
          size={18}
        />
      </div>
      <button type="submit" className="px-4 py-3 bg-gray-800/30 opacity-50">
        Search
      </button>
    </form>
  );
};
