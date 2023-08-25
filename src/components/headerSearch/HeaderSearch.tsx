import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

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
  return (
    <div className="mb-4">
      <TextField
        id="searchTerm"
        label="podcast"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onSearchTermChange(e.target.value)
        }
        className="mb-2"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={onSearch}
        className="w-full"
      >
        Search
      </Button>
    </div>
  );
};
