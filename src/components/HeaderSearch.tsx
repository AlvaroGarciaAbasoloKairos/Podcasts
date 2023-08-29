import { IconButton, InputBase } from '@mui/material';

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchTermChange(e.target.value);
  };

  return (
    <div className="relative flex-grow">
      <InputBase
        id="searchTerm"
        placeholder="podcast"
        value={searchTerm}
        onChange={handleInputChange}
        className="search-input border-none w-822 h-50 pl-14 pr-5 py-0 bg-custom-black1A rounded-15 text-white focus:outline-none placeholder-custom-white-transparent font-quicksand text-16 font-normal"
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
