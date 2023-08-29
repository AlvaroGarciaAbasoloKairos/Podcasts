import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  IconButton,
  Avatar,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  Table,
} from '@mui/material';
import { timeSince, truncateWords, removeHtmlTags } from '../../lib';
import { Episode } from '../../lib/types';
import { formatTime } from '../../lib/';
import { HeaderSearch, SortButton } from '../../components';
interface PodcastViewProps {
  episode: Episode | null;
  selectedEpisodeIndex: number | null;
  setSelectedEpisodeIndex: React.Dispatch<React.SetStateAction<number | null>>;
  isPlaying: boolean;
  onPlayPause: (type: 'podcast' | 'episode') => void;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  episodes: Episode[];
  episodesLoading: boolean;
  episodesError: Error | null;
  fetchEpisodes: (podcastId: number, limit?: number) => Promise<void>;
  setEpisodes: React.Dispatch<React.SetStateAction<Episode[]>>;
}

export const PodcastView: React.FC<PodcastViewProps> = ({
  selectedEpisodeIndex,
  setSelectedEpisodeIndex,
  isPlaying,
  onPlayPause,
  searchTerm,
  setSearchTerm,
  episodes,
  episodesLoading,
  episodesError,
  fetchEpisodes,
  setEpisodes,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const podcastId = location.pathname.split('/').pop();

  console.log('episodes', episodes);

  const handleNavigateHome = () => {
    navigate('/');
  };

  const handleIconButtonClick = (index: number) => {
    if (selectedEpisodeIndex === index) {
      onPlayPause('episode');
    } else {
      setSelectedEpisodeIndex(index);
      if (!isPlaying) {
        onPlayPause('episode');
      }
    }
  };

  const handleSearchTermChange = (term: string) => {
    setSearchTerm(term);
  };

  const handleSearch = () => {
    navigate('/', { state: { searchTerm } });
  };
  const sortPodcasts = (order: 'asc' | 'desc') => {
    const sortedPodcasts = [...episodes].sort((a, b) => {
      if (order === 'asc') {
        return a.trackName.localeCompare(b.trackName);
      }
      return b.trackName.localeCompare(a.trackName);
    });
    setEpisodes(sortedPodcasts);
  };

  useEffect(() => {
    if (podcastId) {
      fetchEpisodes(Number(podcastId));
    }
  }, [podcastId, fetchEpisodes]);

  if (episodesLoading) return <p>Loading...</p>;
  if (episodesError) return <p>Error: {episodesError.message}</p>;
  return (
    <>
      <div className="pt-30 mb-114 flex flex-col items-center w-screen">
        <div className="flex items-center">
          <IconButton
            onClick={handleNavigateHome}
            className="w-50 h-50 p-0 px-5 rounded-15 space-x-10"
          >
            <img src="/images/vector2.svg" alt="Your SVG Description" className="w-9.879 h-5" />
          </IconButton>
          <HeaderSearch
            searchTerm={searchTerm}
            onSearchTermChange={handleSearchTermChange}
            onSearch={handleSearch}
          />
        </div>
      </div>

      {selectedEpisodeIndex !== null && episodes[selectedEpisodeIndex] && (
        <div className="flex justify-center items-center">
          <div className="mt-42 mb-5 mx-auto">
            <img
              src={episodes[selectedEpisodeIndex].artworkUrl600}
              alt={episodes[selectedEpisodeIndex].trackName}
              className="w-822 h-280 rounded-15 bg-cover bg-no-repeat"
            />

            <div className="flex justify-between items-center w-832 h-60 mt-4">
              {/* Ícono a la izquierda */}
              <IconButton onClick={() => handleIconButtonClick(selectedEpisodeIndex)}>
                {isPlaying ? (
                  <div className="bg-custom-blue5C rounded-71 w-60 h-60 flex items-center justify-center">
                    <img
                      src="/images/pause-1.svg"
                      alt="Pause Icon"
                      className="w-6 h-6 flex-shrink-0"
                    />
                  </div>
                ) : (
                  <img src="/images/play-1.svg" alt="Play Icon" className="w-6 h-6 flex-shrink-0" />
                )}
              </IconButton>

              {/* Título en el centro */}
              <h1 className="font-quicksand text-white text-32 font-bold leading-40 tracking-tightest flex-grow">
                {episodes[selectedEpisodeIndex].trackName}
              </h1>

              {/* Div a la derecha */}
              <div className="flex items-center">
                <img
                  src="/images/search.svg"
                  alt="Search Icon"
                  className="w-4 h-4 mr-5 text-custom-white"
                />
                <span className="font-quicksand text-white text-16 font-normal leading-normal h-20 mr-2">
                  Order by
                </span>
                <SortButton onSortChange={sortPodcasts} />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center">
        <Table className="w-832 border-b border-transparent-white-03">
          <TableHead>
            <TableRow>
              <TableCell className="p-0 h-10 text-custom-white-transparent font-quicksand font-600 text-16 leading-normal border-b border-transparent-white-03 -mt-1 tracking-normal text-left">
                #
              </TableCell>
              <TableCell className="p-0 h-10 text-custom-white-transparent font-quicksand font-600 text-14 leading-normal border-b border-transparent-white-03">
                Title
              </TableCell>
              <TableCell className="p-0 h-10 text-custom-white-transparent font-quicksand font-600 text-14 leading-normal w-98 border-b border-transparent-white-03">
                Topic
              </TableCell>
              <TableCell className="p-0 h-10 text-custom-white-transparent font-quicksand font-600 text-14 leading-normal w-98 border-b border-transparent-white-03">
                Released
              </TableCell>
              <TableCell className="p-0 h-10 text-custom-white-transparent font-quicksand font-600 text-14 leading-normal w-98 border-b border-transparent-white-03">
                <img
                  src="/images/vector.svg"
                  alt="Decorative Vector"
                  className="inline-block mr-2"
                />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {episodes.map((episode, index) => (
              <TableRow key={index}>
                <TableCell className="p-0 h-20 border-b border-transparent-white-03">
                  <IconButton onClick={() => handleIconButtonClick(index)}>
                    {selectedEpisodeIndex === index && isPlaying ? (
                      <div className="bg-custom-blue5C rounded-71 w-30 h-30 flex items-center justify-center px-15 py-15">
                        <img
                          src="/images/pause-1.svg"
                          alt="Pause Icon"
                          className="w-11.25 h-11.25 flex-shrink-0"
                        />
                      </div>
                    ) : (
                      <img
                        src="/images/play-1.svg"
                        alt="Play Icon"
                        className="w-15 h-15 flex-shrink-0"
                      />
                    )}
                  </IconButton>
                </TableCell>
                <TableCell className="p-0 h-20 border-b border-transparent-white-03">
                  <div className="flex items-center">
                    <Avatar
                      src={episode.artworkUrl160}
                      alt={episode.trackName}
                      className="w-45 h-45 flex-shrink-0 rounded-8 bg-custom-black1A bg-cover bg-no-repeat"
                    />
                    <div className="ml-2">
                      <span className="text-custom-white font-quicksand font-500 text-16 leading-normal no-underline">
                        {episode.trackName}
                      </span>
                      <br />
                      <span className="text-custom-white font-quicksand font-500 text-16 leading-normal no-underline">
                        {episode.collectionName}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="p-0 h-20 text-custom-white-transparent font-quicksand font-500 text-16 leading-normal no-underline truncate w-210 border-b border-transparent-white-03">
                  {removeHtmlTags(truncateWords(episode.description || 'Loading...', 5))}
                </TableCell>
                <TableCell className="p-0 h-20 text-custom-white-transparent font-quicksand font-500 text-16 leading-normal border-b border-transparent-white-03">
                  {timeSince(episode.releaseDate)}
                </TableCell>
                <TableCell className="p-0 h-20 text-custom-white-transparent font-quicksand font-500 text-16 leading-normal border-b border-transparent-white-03">
                  {formatTime(episode.trackTimeMillis)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};
