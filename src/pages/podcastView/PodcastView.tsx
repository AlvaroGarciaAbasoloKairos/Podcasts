import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ListItem, ListItemText, ListItemAvatar, IconButton } from '@mui/material';
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
  error: any;
  search: (term: string) => void;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  onPlayPause: () => void;
}

export function PodcastView({
  selectedPodcastIndex,
  setSelectedPodcastIndex,
  podcasts,
  loading,
  error,
  search,
  isPlaying,
  onPlayPause,
}: PodcastViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const selectedPodcast = location.state?.podcast;
  const navigate = useNavigate();

  console.log('selectedPodcast', selectedPodcast);

  const handleSearch = () => {
    if (searchTerm) {
      navigate('/', { state: { searchTerm } });
      search(searchTerm);
    }
  };

  return (
    <>
      <div className="pt-7.5 flex flex-col items-center w-screen">
        <HeaderSearch
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
          onSearch={handleSearch}
        />
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error.message}</p>}
      {selectedPodcast && (
        <ListItem className="bg-white rounded shadow p-2 mb-2 cursor-pointer flex items-center">
          <IconButton
            onClick={() => {
              setSelectedPodcastIndex(
                podcasts.findIndex((p) => p.trackId === selectedPodcast.trackId),
              );
              onPlayPause();
            }}
          >
            {isPlaying &&
            selectedPodcastIndex ===
              podcasts.findIndex((p) => p.trackId === selectedPodcast.trackId) ? (
              <Pause />
            ) : (
              <PlayArrow />
            )}
          </IconButton>

          <ListItemAvatar>
            <Avatar src={selectedPodcast.artworkUrl100} alt={selectedPodcast.collectionName} />
          </ListItemAvatar>
          <ListItemText>
            <h2 className="text-lg font-medium">{selectedPodcast.collectionName}</h2>
            <p className="text-sm">Artist: {selectedPodcast.artistName}</p>
          </ListItemText>
        </ListItem>
      )}

      {selectedPodcast && (
        <PodcastPlayer
          podcast={selectedPodcast}
          onNext={() =>
            setSelectedPodcastIndex((prevIndex) => ((prevIndex ?? 0) + 1) % podcasts.length)
          }
          onPrevious={() =>
            setSelectedPodcastIndex(
              (prevIndex) => ((prevIndex ?? 0) - 1 + podcasts.length) % podcasts.length,
            )
          }
          selectedPodcastIndex={selectedPodcastIndex}
          setSelectedPodcastIndex={setSelectedPodcastIndex}
          podcasts={podcasts}
          isPlaying={isPlaying}
          onPlayPause={onPlayPause}
        />
      )}
    </>
  );
}
