import { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PodcastSearch } from './pages/podcastSearch';
import { PodcastView } from './pages/podcastView';
import { useViewEpisodes, useViewPodcasts } from './hooks';
import { Episode } from './lib/types';
import { PodcastPlayer, EpisodePlayer } from './components';

function App() {
  const [selectedPodcastIndex, setSelectedPodcastIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEpisodeIndex, setSelectedEpisodeIndex] = useState<number | null>(null);
  const { episodes, fetchEpisodes, episodesLoading, episodesError, setEpisodes } = useViewEpisodes<Episode>();
  const selectedEpisode = selectedEpisodeIndex !== null ? episodes[selectedEpisodeIndex] : null;
  const { podcasts, loading, error, search, setPodcasts } = useViewPodcasts();
  const [playingType, setPlayingType] = useState<'podcast' | 'episode' | null>(null);

  const handlePlayPause = (type: 'podcast' | 'episode') => {
    setIsPlaying((prevIsPlaying) => {
      setPlayingType(prevIsPlaying ? null : type);
      return !prevIsPlaying;
    });
  };

  const handleNext = () => {
    setSelectedPodcastIndex((prevIndex) => ((prevIndex ?? 0) + 1) % podcasts.length);
  };

  const handlePrevious = () => {
    setSelectedPodcastIndex(
      (prevIndex) => ((prevIndex ?? 0) - 1 + podcasts.length) % podcasts.length,
    );
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <PodcastSearch
          selectedPodcastIndex={selectedPodcastIndex}
          setSelectedPodcastIndex={setSelectedPodcastIndex}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          onPlayPause={handlePlayPause}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          loading={loading}
          error={error}
          search={search}
          podcasts={podcasts}
          setPodcasts={setPodcasts}
        />
      ),
    },
    {
      path: '/podcast/:podcastId',
      element: (
        <PodcastView
          episode={selectedEpisode}
          selectedEpisodeIndex={selectedEpisodeIndex}
          setSelectedEpisodeIndex={setSelectedEpisodeIndex}
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          episodes={episodes}
          episodesLoading={episodesLoading}
          episodesError={episodesError}
          fetchEpisodes={fetchEpisodes}
          setEpisodes={setEpisodes}
        />
      ),
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      {selectedPodcastIndex !== null && podcasts[selectedPodcastIndex] && (
        <PodcastPlayer
          podcast={podcasts[selectedPodcastIndex]}
          onNext={handleNext}
          onPrevious={handlePrevious}
          selectedPodcastIndex={selectedPodcastIndex}
          setSelectedPodcastIndex={setSelectedPodcastIndex}
          podcasts={podcasts}
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          playingType={playingType}
        />
      )}
      {selectedEpisodeIndex !== null && (
        <EpisodePlayer
          episode={episodes[selectedEpisodeIndex]}
          onNext={() => {}}
          onPrevious={() => {}}
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          playingType={playingType}
        />
      )}
    </>
  );
}

export default App;
