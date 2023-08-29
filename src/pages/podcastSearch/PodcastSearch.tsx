import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import {
  IconButton,
  Avatar,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  Table,
} from '@mui/material';
import { HeaderSearch, SortButton } from '../../components';
import { timeSince, truncateWords, removeHtmlTags } from '../../lib';
import { getPodcastDescription } from '../../services';
import { Podcast } from '../../lib/types';

interface PodcastSearchProps {
  selectedPodcastIndex: number | null;
  setSelectedPodcastIndex: React.Dispatch<React.SetStateAction<number | null>>;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  onPlayPause: (type: 'podcast' | 'episode') => void;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  podcasts: Podcast[];
  loading: boolean;
  error: Error | null;
  search: (term: string, limit?: number) => Promise<void>;
  setPodcasts: React.Dispatch<React.SetStateAction<Podcast[]>>;
}

export const PodcastSearch: React.FC<PodcastSearchProps> = ({
  selectedPodcastIndex,
  setSelectedPodcastIndex,
  isPlaying,
  onPlayPause,
  setIsPlaying,
  searchTerm,
  setSearchTerm,
  podcasts,
  loading,
  error,
  search,
  setPodcasts,
}) => {
  const location = useLocation();
  const passedSearchTerm = location.state?.searchTerm;
  const passedSelectedPodcastIndex = location.state?.selectedPodcastIndex;
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
      onPlayPause('podcast');
    }
    onPlayPause('podcast');
  };

  const handleIconButtonClick = (index: number) => {
    if (selectedPodcastIndex === index) {
      onPlayPause('podcast');
    } else {
      setSelectedPodcastIndex(index);
      if (!isPlaying) {
        onPlayPause('podcast');
      }
    }
  };

  const sortPodcasts = (order: 'asc' | 'desc') => {
    const sortedPodcasts = [...podcasts].sort((a, b) => {
      if (order === 'asc') {
        return a.collectionName.localeCompare(b.collectionName);
      }
      return b.collectionName.localeCompare(a.collectionName);
    });
    setPodcasts(sortedPodcasts);
  };

  useEffect(() => {
    if (passedSearchTerm) {
      setSearchTerm(passedSearchTerm);
      search(passedSearchTerm);
    }
  }, [passedSearchTerm, search, setSearchTerm]);

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

  useEffect(() => {
    if (passedSearchTerm) {
      setSearchTerm(passedSearchTerm);
    }
    if (typeof passedSelectedPodcastIndex === 'number') {
      setSelectedPodcastIndex(passedSelectedPodcastIndex);
    }
  }, [passedSearchTerm, passedSelectedPodcastIndex, setSearchTerm, setSelectedPodcastIndex]);

  return (
    <>
      <div className="pt-30 mb-34 flex flex-col items-center w-screen">
        <HeaderSearch
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
          onSearch={handleSearch}
        />
      </div>

      <div className="flex justify-center items-center mb-5">
        <div className="w-832">
          <div className="flex items-center justify-end">
            <img
              src="images/search.svg"
              alt="Search Icon"
              className="w-4 h-4 mr-5 text-custom-white"
            />
            <span className="font-quicksand text-white text-left text-16 font-normal leading-normal h-20">
              Order by
            </span>
            <SortButton onSortChange={sortPodcasts} />
          </div>
        </div>
      </div>

      {error && <p className="text-red-500">Error: {error.message}</p>}

      <div className="flex justify-center">
        <Table className="w-832  border-b border-transparent-white-03">
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
                <TableCell className="h-20 p-0  border-b border-transparent-white-03">
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
                <TableCell className="p-0 h-20  text-custom-white-transparent font-quicksand font-500 text-16 leading-normal no-underline truncate w-210 border-b border-transparent-white-03">
                  {removeHtmlTags(
                    truncateWords(descriptions.get(podcast.trackId) || 'Loading...', 5),
                  )}
                </TableCell>
                <TableCell className="p-0 h-20 text-custom-white-transparent font-quicksand font-500 text-16 leading-normal border-b border-transparent-white-03">
                  {timeSince(podcast.releaseDate)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};
