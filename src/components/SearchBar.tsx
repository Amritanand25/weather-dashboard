import React, { useState } from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (city: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="relative group">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a city..."
          className="search-input w-full px-4 py-3 pl-10 bg-gray-800/30 rounded-xl 
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
    </form>
  );
};
