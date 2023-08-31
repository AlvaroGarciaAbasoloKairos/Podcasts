import { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PodcastSearch } from './pages/podcastSearch';
import { PodcastView } from './pages/podcastView';
import { useViewEpisodes, useViewPodcasts } from './hooks';
import { Episode } from './lib/types';
import { PodcastPlayer } from './components';

function App() {
  const [selectedPodcastIndex, setSelectedPodcastIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [playingType, setPlayingType] = useState<'podcast' | 'episode' | null>(null);
  const [selectedEpisodeIndex, setSelectedEpisodeIndex] = useState<number | null>(null);
  const { episodes, fetchEpisodes, episodesLoading, episodesError, setEpisodes } =
    useViewEpisodes<Episode>();
  const selectedEpisode = selectedEpisodeIndex !== null ? episodes[selectedEpisodeIndex] : null;
  const { podcasts, error, search, setPodcasts } = useViewPodcasts();

  const handlePlayPause = (type: 'podcast' | 'episode') => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
    if (!isPlaying) {
      setPlayingType(type);
    }
  };
  const handleNext = () => {
    if (playingType === 'podcast') {
      setSelectedPodcastIndex((prevIndex) => ((prevIndex ?? 0) + 1) % podcasts.length);
    } else if (playingType === 'episode' && selectedEpisodeIndex !== null) {
      setSelectedEpisodeIndex((prevIndex) => ((prevIndex ?? 0) + 1) % episodes.length);
    }
  };

  const handlePrevious = () => {
    if (playingType === 'podcast') {
      setSelectedPodcastIndex(
        (prevIndex) => ((prevIndex ?? 0) - 1 + podcasts.length) % podcasts.length,
      );
    } else if (playingType === 'episode' && selectedEpisodeIndex !== null) {
      setSelectedEpisodeIndex(
        (prevIndex) => ((prevIndex ?? 0) - 1 + episodes.length) % episodes.length,
      );
    }
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <PodcastSearch
          selectedPodcastIndex={selectedPodcastIndex}
          setSelectedPodcastIndex={setSelectedPodcastIndex}
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
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
      {playingType && (
        <PodcastPlayer
          data={
            playingType === 'podcast'
              ? podcasts[selectedPodcastIndex!]
              : episodes[selectedEpisodeIndex!]
          }
          onNext={handleNext }
          onPrevious={ handlePrevious }
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          playingType={playingType}
        />
      )}
    </>
  );
}
export default App;
