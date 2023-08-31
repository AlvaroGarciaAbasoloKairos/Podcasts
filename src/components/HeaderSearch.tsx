import { IconButton, InputBase } from '@mui/material';

interface HeaderSearchProps {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  onSearch: () => void;
  className?: string;
}

export const HeaderSearch: React.FC<HeaderSearchProps> = ({
  searchTerm,
  onSearchTermChange,
  onSearch,
  className,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch();
      onSearchTermChange('');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchTermChange(e.target.value);
  };

  return (
    <div className={`relative flex-grow ${className}`}>
      <InputBase
        id="searchTerm"
        placeholder="podcast"
        value={searchTerm}
        onChange={handleInputChange}
        className="search-input w-full  border-none h-12 pl-14 pr-5 py-0 bg-custom-black1A placeholder-white-transparent rounded-2xl text-white focus:outline-none  font-quicksand text-base font-normal"
        autoComplete="off"
        onKeyDown={handleKeyDown}
        startAdornment={
          <IconButton
            onClick={onSearch}
            className="absolute left-5 top-1/2 transform -translate-y-1/2"
            size="small"
            edge="start"
          >
            <img src="/images/search-21.svg" alt="Search" className="text-custom-white h-5 w-5" />
          </IconButton>
        }
      />
    </div>
  );
};
