import React, { useEffect, useRef, useState } from "react";

interface AutosuggestProps {
  suggestions: string[];
  onSelect: (value: string) => void;
  query: string;
}

const Autosuggestion: React.FC<AutosuggestProps> = ({
  suggestions,
  onSelect,
  query,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedButton, setSelectedButton] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredSuggestions = suggestions.filter((suggestion) =>
    suggestion.toLowerCase().startsWith(query.toLowerCase())
  );

  useEffect(() => {
    if (query?.trim()?.length > 0 && !selectedButton) {
      setIsOpen(true);
    }
    if (selectedButton) {
      setSelectedButton(false);
    }
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!query || filteredSuggestions.length === 0 || !isOpen) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="absolute top-16 left-0 shadow-md max-h-72 overflow-y-auto z-10 search-input w-full bg-gray-800/30 rounded-md 
    text-white placeholder-purple-300/50 focus:outline-none
    backdrop-blur-md transition-all duration-300
    group-hover:bg-gray-800/40"
    >
      {filteredSuggestions.map((suggestion, index) => (
        <div
          key={index}
          className="px-4 py-2 w-[96%] cursor-pointer rounded-xl hover:opacity-60"
          onClick={() => {
            onSelect(suggestion);
            setSelectedButton(true);
            setIsOpen(true);
          }}
        >
          {suggestion}
        </div>
      ))}
    </div>
  );
};

export default Autosuggestion;
