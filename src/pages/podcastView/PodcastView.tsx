import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  IconButton,
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { PlayArrow, Pause } from '@mui/icons-material';
import { HeaderSearch } from '../../components/headerSearch';
import { PodcastPlayer } from '../../components/podcastPlayer';

interface Podcast {
  trackId: number;
  artworkUrl100: string;
  collectionName: string;
  artistName: string;
  feedUrl: string;
}
interface PodcastViewProps {
  selectedPodcastIndex: number | null;
  setSelectedPodcastIndex: React.Dispatch<React.SetStateAction<number | null>>;
  podcasts: Podcast[];
  loading: boolean;
  error: Error | null;
  search: (term: string, limit?: number) => Promise<void>;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  onPlayPause: () => void;
}

export const PodcastView: React.FC<PodcastViewProps> = ({
  selectedPodcastIndex,
  setSelectedPodcastIndex,
  podcasts,
  loading,
  error,
  search,
  isPlaying,
  onPlayPause,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const passedSearchTerm = location.state?.searchTerm;
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (searchTerm) {
      await search(searchTerm);
    }
  };
  const handlePodcastClick = (podcast: Podcast) => {
    navigate(`/podcast/${podcast.trackId}`, {
      state: { selectedPodcast: podcast },
    });
    setSelectedPodcastIndex(podcasts.indexOf(podcast));
    if (isPlaying) {
      onPlayPause();
    }
    onPlayPause();
  };

  useEffect(() => {
    if (passedSearchTerm) {
      setSearchTerm(passedSearchTerm);
      search(passedSearchTerm);
    }
  }, [passedSearchTerm, search]);

  return (
    <div className="p-4">
      <HeaderSearch
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        onSearch={handleSearch}
      />

      {loading && (
        <div className="flex justify-center">
          <CircularProgress />
        </div>
      )}

      {error && <p className="text-red-500">Error: {error.message}</p>}

      <div className="space-y-2">
        {podcasts.map((podcast: Podcast, index: number) => (
          <ListItem
            key={podcast.trackId}
            className="bg-white rounded shadow p-2 mb-2 cursor-pointer"
          >
            <IconButton
              onClick={() => {
                if (selectedPodcastIndex === index) {
                  onPlayPause();
                } else {
                  setSelectedPodcastIndex(index);
                  if (!isPlaying) {
                    onPlayPause();
                  }
                }
              }}
            >
              {selectedPodcastIndex === index && isPlaying ? (
                <Pause />
              ) : (
                <PlayArrow />
              )}
            </IconButton>

            <ListItemAvatar onClick={() => handlePodcastClick(podcast)}>
              <Link
                to={`/podcast/${podcast.trackId}`}
                state={{ podcast }}
                onClick={() => handlePodcastClick(podcast)}
              >
                <Avatar src={podcast.artworkUrl100} />
              </Link>
            </ListItemAvatar>
            <ListItemText>
              <Link
                to={`/podcast/${podcast.trackId}`}
                state={{ podcast }}
                onClick={() => handlePodcastClick(podcast)}
              >
                {podcast.collectionName}
              </Link>
              <br />
              <Link
                to={`/podcast/${podcast.trackId}`}
                state={{ podcast }}
                onClick={() => handlePodcastClick(podcast)}
              >
                {podcast.artistName}
              </Link>
            </ListItemText>
          </ListItem>
        ))}
      </div>
      {selectedPodcastIndex !== null && (
        <PodcastPlayer
          podcast={podcasts[selectedPodcastIndex]}
          onNext={() =>
            setSelectedPodcastIndex(
              (prevIndex) => ((prevIndex ?? 0) + 1) % podcasts.length,
            )
          }
          onPrevious={() =>
            setSelectedPodcastIndex(
              (prevIndex) =>
                ((prevIndex ?? 0) - 1 + podcasts.length) % podcasts.length,
            )
          }
          selectedPodcastIndex={selectedPodcastIndex}
          setSelectedPodcastIndex={setSelectedPodcastIndex}
          podcasts={podcasts}
          isPlaying={isPlaying}
          onPlayPause={onPlayPause}
        />
      )}
    </div>
  );
};
