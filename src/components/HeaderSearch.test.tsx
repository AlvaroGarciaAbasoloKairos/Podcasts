import { render, fireEvent, screen } from '@testing-library/react';
import { HeaderSearch } from './HeaderSearch';

describe('HeaderSearch Component', () => {
  it('calls onSearchTermChange with the entered text', () => {
    const mockOnSearchTermChange = jest.fn();
    render(
      <HeaderSearch
        searchTerm=""
        onSearchTermChange={mockOnSearchTermChange}
        onSearch={() => {}}
      />,
    );

    const input = screen.getByPlaceholderText('podcast');
    fireEvent.change(input, { target: { value: 'React' } });

    expect(mockOnSearchTermChange).toHaveBeenCalledWith('React');
  });

  it('calls onSearch when the Enter key is pressed and resets the input', () => {
    const mockOnSearch = jest.fn();
    const mockOnSearchTermChange = jest.fn();
    render(
      <HeaderSearch
        searchTerm="React"
        onSearchTermChange={mockOnSearchTermChange}
        onSearch={mockOnSearch}
      />,
    );

    const input = screen.getByPlaceholderText('podcast');
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(mockOnSearch).toHaveBeenCalled();
    expect(mockOnSearchTermChange).toHaveBeenCalledWith('');
  });

  it('calls onSearch when the search icon is clicked', () => {
    const mockOnSearch = jest.fn();
    render(
      <HeaderSearch searchTerm="React" onSearchTermChange={() => {}} onSearch={mockOnSearch} />,
    );

    const searchButton = screen.getByAltText('Search');
    fireEvent.click(searchButton);

    expect(mockOnSearch).toHaveBeenCalled();
  });
});
