import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { PodcastView } from './PodcastView';

describe('<PodcastView />', () => {
  it('renders without crashing', () => {
    const mockProps = {
      episode: null,
      selectedEpisodeIndex: null,
      setSelectedEpisodeIndex: jest.fn(),
      isPlaying: false,
      onPlayPause: jest.fn(),
      searchTerm: '',
      setSearchTerm: jest.fn(),
      episodes: [],
      episodesLoading: false,
      episodesError: null,
      fetchEpisodes: jest.fn(),
      setEpisodes: jest.fn(),
    };

    render(
      <BrowserRouter>
        <PodcastView {...mockProps} />
      </BrowserRouter>,
    );
  });
  it('displays loading state when episodes are being fetched', () => {
    const mockProps = {
      episode: null,
      selectedEpisodeIndex: null,
      setSelectedEpisodeIndex: jest.fn(),
      isPlaying: false,
      onPlayPause: jest.fn(),
      searchTerm: '',
      setSearchTerm: jest.fn(),
      episodes: [],
      episodesLoading: true,
      episodesError: null,
      fetchEpisodes: jest.fn(),
      setEpisodes: jest.fn(),
    };

    render(
      <BrowserRouter>
        <PodcastView {...mockProps} />
      </BrowserRouter>,
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
  it('displays an error message when there is an error fetching episodes', () => {
    const errorMessage = new Error('Error fetching episodes');

    const mockProps = {
      episode: null,
      selectedEpisodeIndex: null,
      setSelectedEpisodeIndex: jest.fn(),
      isPlaying: false,
      onPlayPause: jest.fn(),
      searchTerm: '',
      setSearchTerm: jest.fn(),
      episodes: [],
      episodesLoading: false,
      episodesError: errorMessage,
      fetchEpisodes: jest.fn(),
      setEpisodes: jest.fn(),
    };

    render(
      <BrowserRouter>
        <PodcastView {...mockProps} />
      </BrowserRouter>,
    );

    expect(screen.getByText(/Error fetching episodes/)).toBeInTheDocument();
  });
});
