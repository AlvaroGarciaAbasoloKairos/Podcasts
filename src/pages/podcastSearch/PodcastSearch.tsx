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
import { timeSince, removeHtmlTags } from '../../lib';
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
    // Si es el mismo podcast, solo pausarlo
    if (selectedPodcastIndex === index) {
      onPlayPause('podcast');
      return;
    }
    // Si hay un podcast reproduciéndose, pausarlo
    if (isPlaying) {
      onPlayPause('podcast');
    }
    // Seleccionar el nuevo podcast y empezar a reproducirlo
    setSelectedPodcastIndex(index);
    onPlayPause('podcast');
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
          className="w-[822px]"
        />
      </div>

      <div className="flex justify-center items-center mb-5 w-screen">
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

      <div className="flex justify-center w-screen">
        <Table className="w-832  border-b border-transparent-white-03">
          <TableHead>
            <TableRow>
              <TableCell className="p-0 h-10 text-custom-whiteTransparent font-quicksand font-600 text-16 leading-normal border-b border-transparent-white-03 -mt-1 tracking-normal text-left">
                #
              </TableCell>
              <TableCell className="p-0 h-10 text-custom-whiteTransparent font-quicksand font-600 text-14 leading-normal border-b border-transparent-white-03">
                Name
              </TableCell>
              <TableCell className="p-0 h-10 text-custom-whiteTransparent font-quicksand font-600 text-14 leading-normal w-98 border-b border-transparent-white-03">
                Description
              </TableCell>
              <TableCell className="p-0 h-10 text-custom-whiteTransparent font-quicksand font-600 text-14 leading-normal w-98 border-b border-transparent-white-03">
                Released
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {podcasts.map((podcast: Podcast, index: number) => (
              <TableRow key={podcast.trackId} >
                <TableCell className="p-0 h-80 w-50 border-b border-transparent-white-03">
                  <IconButton onClick={() => handleIconButtonClick(index)} className="pl-0">
                    {selectedPodcastIndex === index && isPlaying ? (
                      <div className="bg-custom-blue5C rounded-71 w-30 h-30 flex items-center justify-center px-15 py-15">
                        <img
                          src="/images/pause-1.svg"
                          alt="Pause"
                          className="w-11.25 h-11.25 flex-shrink-0"
                        />
                      </div>
                    ) : (
                      <div className="pl-2">
                        <img
                          src="/images/play-1.svg"
                          alt="Play"
                          className="w-15 h-15 flex-shrink-0"
                        />
                      </div>
                    )}
                  </IconButton>
                </TableCell>
                <TableCell className="p-0 w-45 h-80 flex items-center border-b border-transparent-white-03">
                  <Avatar
                    src={podcast.artworkUrl100}
                    alt={podcast.collectionName}
                    className="w-45 h-45 rounded-8 bg-custom-black1A bg-cover bg-no-repeat"
                  />
                  <div className="ml-5 w-198 h-38 flex flex-col">
                    <Link
                      to={`/podcast/${podcast.trackId}`}
                      state={{ podcast }}
                      onClick={() => handlePodcastClick(podcast)}
                      className="text-custom-white font-quicksand font-500 text-16 leading-normal no-underline truncate "
                    >
                      {podcast.collectionName}
                    </Link>
                    <Link
                      to={`/podcast/${podcast.trackId}`}
                      state={{ podcast }}
                      onClick={() => handlePodcastClick(podcast)}
                      className="text-custom-whiteTransparent font-quicksand font-500 text-14 leading-normal no-underline truncate "
                    >
                      {podcast.artistName}
                    </Link>
                  </div>
                </TableCell>
                <TableCell className="p-0 border-transparent-white-03 w-330 ">
                  <div className="w-210 h-10  text-custom-whiteTransparent font-quicksand font-500 text-16 leading-normal no-underline truncate border-b ">
                    {removeHtmlTags(descriptions.get(podcast.trackId) || 'Loading...')}
                  </div>
                </TableCell>
                <TableCell className="p-0 w-92 h-5 text-custom-whiteTransparent font-quicksand font-500 text-16 leading-normal border-b border-transparent-white-03">
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
