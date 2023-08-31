import { render, fireEvent, screen } from '@testing-library/react';
import { SortButton } from './SortButton';

describe('SortButton Component', () => {
  it('Changes the order and calls the onSortChange function', () => {
    const mockOnSortChange = jest.fn();
    render(<SortButton onSortChange={mockOnSortChange} />);
    
    const button = screen.getByAltText('Order');
    fireEvent.click(button);

    expect(mockOnSortChange).toHaveBeenCalledWith('desc');
  });
});
