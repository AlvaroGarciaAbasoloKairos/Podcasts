import React from 'react';

interface HeaderSearchProps {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  onSearch: () => void;
}

export const HeaderSearch: React.FC<HeaderSearchProps> = ({
  searchTerm,
  onSearchTermChange,
  onSearch,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };
  return (
    <div className="relative flex-grow">
      <input
        id="searchTerm"
        placeholder="podcast"
        value={searchTerm}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearchTermChange(e.target.value)}
        className="search-input border-none w-822 h-50 pl-14 pr-5 py-0 bg-custom-black1A rounded-15 text-white focus:outline-none placeholder-custom-white-transparent font-quicksand text-16 font-normal"
        autoComplete="off"
        onKeyDown={handleKeyDown}
      />
      <button
        onClick={onSearch}
        className="bg-transparent border-none absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5"
      >
        <img src="/search-21.svg" alt="Search Icon" className="w-5 h-5 fill-white" />
      </button>
    </div>
  );
};
