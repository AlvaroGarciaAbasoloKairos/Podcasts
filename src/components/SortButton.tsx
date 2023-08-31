import React, { useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
interface SortButtonProps {
  onSortChange: (order: 'asc' | 'desc') => void;
}

export const SortButton: React.FC<SortButtonProps> = ({ onSortChange }) => {
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const handleClick = () => {
    const newOrder = order === 'asc' ? 'desc' : 'asc';
    setOrder(newOrder);
    onSortChange(newOrder);
  };

  return (
    <Tooltip title={`Ordenar ${order === 'asc' ? 'Descendente' : 'Ascendente'}`}>
      <IconButton onClick={handleClick} className="pl-1.5 ml-0">
        <img src="/images/angle-small-down-1.svg" alt="Order" />
      </IconButton>
    </Tooltip>
  );
};
