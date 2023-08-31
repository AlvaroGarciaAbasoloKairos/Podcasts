import { render, screen } from '@testing-library/react';
import { PodcastSearch } from './PodcastSearch';
import { MemoryRouter } from 'react-router-dom';
import { Podcast } from '../../lib/types';

describe('PodcastSearch Component', () => {
  it('renders without crashing', () => {
    const mockProps = {
      selectedPodcastIndex: null,
      setSelectedPodcastIndex: jest.fn(),
      isPlaying: false,
      onPlayPause: jest.fn(),
      searchTerm: '',
      setSearchTerm: jest.fn(),
      podcasts: [],
      error: null,
      search: jest.fn(),
      setPodcasts: jest.fn(),
    };
    render(
      <MemoryRouter>
        <PodcastSearch {...mockProps} />
      </MemoryRouter>,
    );
    const searchElement = screen.getByText(/Order by/i);
    expect(searchElement).toBeInTheDocument();
  });

  it('displays an error message when an error is provided', () => {
    const mockProps = {
      selectedPodcastIndex: null,
      setSelectedPodcastIndex: jest.fn(),
      isPlaying: false,
      onPlayPause: jest.fn(),
      searchTerm: '',
      setSearchTerm: jest.fn(),
      podcasts: [],
      error: new Error('Test error'),
      search: jest.fn(),
      setPodcasts: jest.fn(),
    };
    render(
      <MemoryRouter>
        <PodcastSearch {...mockProps} />
      </MemoryRouter>,
    );

    const errorElement = screen.getByText(/Test error/i);
    expect(errorElement).toBeInTheDocument();
  });

  it('displays a podcast name when provided in podcasts prop', () => {
    const mockPodcast: Podcast = {
      trackId: 1,
      artworkUrl100: 'test-artwork-url',
      collectionName: 'Test Podcast',
      artistName: 'Test Artist',
      feedUrl: 'test-feed-url',
      releaseDate: new Date().toISOString(),
      trackUrl: 'test-track-url',
      trackTimeMillis: 1234567,
    };

    const mockProps = {
      selectedPodcastIndex: null,
      setSelectedPodcastIndex: jest.fn(),
      isPlaying: false,
      onPlayPause: jest.fn(),
      searchTerm: '',
      setSearchTerm: jest.fn(),
      podcasts: [mockPodcast],
      error: null,
      search: jest.fn(),
      setPodcasts: jest.fn(),
    };
    render(
      <MemoryRouter>
        <PodcastSearch {...mockProps} />
      </MemoryRouter>,
    );

    const podcastNameElement = screen.getByText(/Test Podcast/i);
    expect(podcastNameElement).toBeInTheDocument();
  });
});
