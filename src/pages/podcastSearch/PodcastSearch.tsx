import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import Avatar from '@mui/material/Avatar';
import { HeaderSearch } from '../../components/headerSearch';
import { PodcastPlayer } from '../../components/podcastPlayer';
import { timeSince, truncateWords } from '../../lib';
import { getPodcastDescription } from '../../services';
import { removeHtmlTags } from '../../lib';

interface Podcast {
  trackId: number;
  artworkUrl100: string;
  collectionName: string;
  artistName: string;
  feedUrl: string;
  releaseDate: string;
}
interface PodcastSearchProps {
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

export const PodcastSearch: React.FC<PodcastSearchProps> = ({
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
  const [descriptions, setDescriptions] = useState<Map<number, string>>(new Map());

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

  const handleIconButtonClick = (index: number) => {
    if (selectedPodcastIndex === index) {
      onPlayPause();
    } else {
      setSelectedPodcastIndex(index);
      if (!isPlaying) {
        onPlayPause();
      }
    }
  };

  const handleNext = () => {
    setSelectedPodcastIndex((prevIndex) => ((prevIndex ?? 0) + 1) % podcasts.length);
  };

  const handlePrevious = () => {
    setSelectedPodcastIndex(
      (prevIndex) => ((prevIndex ?? 0) - 1 + podcasts.length) % podcasts.length,
    );
  };

  useEffect(() => {
    if (passedSearchTerm) {
      setSearchTerm(passedSearchTerm);
      search(passedSearchTerm);
    }
  }, [passedSearchTerm, search]);

  console.log('podcasts', podcasts); //<--------------------------------
  console.log('passedSearchTerm', passedSearchTerm); //<--------------------------------

  useEffect(() => {
    const fetchDescriptions = async () => {
      const tempDescriptions = new Map();
      for (let podcast of podcasts) {
        const description = await getPodcastDescription(podcast.feedUrl);
        tempDescriptions.set(podcast.trackId, description);
      }
      setDescriptions(tempDescriptions);
    };

    fetchDescriptions();
  }, [podcasts]);

  return (
    <>
      <div className="pt-30 mb-114 flex flex-col items-center w-screen">
        <HeaderSearch
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
          onSearch={handleSearch}
        />
      </div>

      {error && <p className="text-red-500">Error: {error.message}</p>}
      <div className="flex justify-center">
        <Table className="w-832 border-b border-transparent-white-03">
          <TableHead>
            <TableRow>
              <TableCell className="p-0 h-10 text-custom-white-transparent font-quicksand font-600 text-16 leading-normal border-b border-transparent-white-03 -mt-1 tracking-normal text-left">
                #
              </TableCell>
              <TableCell className="p-0 h-10 text-custom-white-transparent font-quicksand font-600 text-14 leading-normal border-b border-transparent-white-03">
                Name
              </TableCell>
              <TableCell className="p-0 h-10 text-custom-white-transparent font-quicksand font-600 text-14 leading-normal w-98 border-b border-transparent-white-03">
                Description
              </TableCell>
              <TableCell className="p-0 h-10 text-custom-white-transparent font-quicksand font-600 text-14 leading-normal w-98 border-b border-transparent-white-03">
                Released
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {podcasts.map((podcast: Podcast, index: number) => (
              <TableRow key={podcast.trackId}>
                <TableCell className="p-0 h-20 border-b border-transparent-white-03">
                  <IconButton onClick={() => handleIconButtonClick(index)}>
                    {selectedPodcastIndex === index && isPlaying ? (
                      <div className="bg-custom-blue5C rounded-71 w-30 h-30 flex items-center justify-center px-15 py-15">
                        <img
                          src="/images/pause-1.svg"
                          alt="Pause"
                          className="w-11.25 h-11.25 flex-shrink-0"
                        />
                      </div>
                    ) : (
                      <img
                        src="/images/play-1.svg"
                        alt="Play"
                        className="w-15 h-15 flex-shrink-0"
                      />
                    )}
                  </IconButton>
                </TableCell>
                <TableCell className=" p-0 h-20 border-b border-transparent-white-03">
                  <div className="flex items-center">
                    <Avatar
                      src={podcast.artworkUrl100}
                      alt={podcast.collectionName}
                      className="w-45 h-45 flex-shrink-0 rounded-8 bg-custom-black1A bg-cover bg-no-repeat"
                    />
                    <div className="ml-2">
                      <Link
                        to={`/podcast/${podcast.trackId}`}
                        state={{ podcast }}
                        onClick={() => handlePodcastClick(podcast)}
                        className="text-custom-white font-quicksand font-500 text-16 leading-normal no-underline "
                      >
                        {podcast.collectionName}
                      </Link>
                      <br />
                      <Link
                        to={`/podcast/${podcast.trackId}`}
                        state={{ podcast }}
                        onClick={() => handlePodcastClick(podcast)}
                        className="text-custom-white-transparent font-quicksand font-500 text-14 leading-normal no-underline"
                      >
                        {podcast.artistName}
                      </Link>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="p-0 h-20 text-custom-white-transparent font-quicksand font-500 text-16 leading-normal no-underline truncate w-210 border-b border-transparent-white-03">
                  {removeHtmlTags(
                    truncateWords(descriptions.get(podcast.trackId) || 'Loading...', 5),
                  )}
                </TableCell>
                <TableCell className="p-0 h-20  text-custom-white-transparent font-quicksand font-500 text-16 leading-normal border-b border-transparent-white-03">
                  {timeSince(podcast.releaseDate)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {selectedPodcastIndex !== null && (
        <PodcastPlayer
          podcast={podcasts[selectedPodcastIndex]}
          onNext={handleNext}
          onPrevious={handlePrevious}
          selectedPodcastIndex={selectedPodcastIndex}
          setSelectedPodcastIndex={setSelectedPodcastIndex}
          podcasts={podcasts}
          isPlaying={isPlaying}
          onPlayPause={onPlayPause}
        />
      )}
    </>
  );
};
