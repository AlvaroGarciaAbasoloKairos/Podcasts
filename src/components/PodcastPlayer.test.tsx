import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { PodcastPlayer } from './PodcastPlayer';
import { Podcast } from '../lib/types';

const mockPodcastData: Podcast = {
  trackId: 1,
  artworkUrl100: 'test.jpg',
  collectionName: 'Test Podcast',
  artistName: 'Test Artist',
  feedUrl: 'https://example.com/feed.xml',
  releaseDate: '2023-01-01T00:00:00Z',
  trackUrl: 'https://example.com/track.mp3',
  trackTimeMillis: 1000,
};

const mockCallbacks = {
  onNext: jest.fn(),
  onPrevious: jest.fn(),
  onPlayPause: jest.fn(),
};

jest.mock('../services', () => ({
  getPodcastFeed: jest.fn(() => Promise.resolve({ eps: [] })),
}));

beforeAll(() => {
  window.HTMLMediaElement.prototype.play = jest.fn();
  window.HTMLMediaElement.prototype.pause = jest.fn();
});

describe('<PodcastPlayer />', () => {
  it('renders the podcast title correctly', async () => {
    render(
      <PodcastPlayer
        data={mockPodcastData}
        onNext={mockCallbacks.onNext}
        onPrevious={mockCallbacks.onPrevious}
        onPlayPause={mockCallbacks.onPlayPause}
        isPlaying={false}
        playingType="podcast"
      />,
    );
    const podcastTitle = await screen.findByText(mockPodcastData.collectionName);
    expect(podcastTitle).toBeInTheDocument();
  });

  it('renders the podcast artist name correctly', () => {
    render(
      <PodcastPlayer
        data={mockPodcastData}
        onNext={mockCallbacks.onNext}
        onPrevious={mockCallbacks.onPrevious}
        onPlayPause={mockCallbacks.onPlayPause}
        isPlaying={false}
        playingType="podcast"
      />,
    );
    expect(screen.getByText(mockPodcastData.artistName)).toBeInTheDocument();
  });

  it('renders the podcast artwork image correctly', () => {
    render(
      <PodcastPlayer
        data={mockPodcastData}
        onNext={mockCallbacks.onNext}
        onPrevious={mockCallbacks.onPrevious}
        onPlayPause={mockCallbacks.onPlayPause}
        isPlaying={false}
        playingType="podcast"
      />,
    );
    const artworkImage = screen.getByAltText('Artwork');
    expect(artworkImage).toBeInTheDocument();
    expect(artworkImage).toHaveAttribute('src', mockPodcastData.artworkUrl100);
  });

  let errorSpy: jest.SpyInstance;

  beforeEach(() => {
    errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    errorSpy.mockRestore();
  });

  it('should not log any errors', () => {
    render(
      <PodcastPlayer
        data={mockPodcastData}
        onNext={mockCallbacks.onNext}
        onPrevious={mockCallbacks.onPrevious}
        onPlayPause={mockCallbacks.onPlayPause}
        isPlaying={false}
        playingType="podcast"
      />,
    );
    expect(errorSpy).not.toHaveBeenCalled();
  });
});
