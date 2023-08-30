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
import { timeSince, removeHtmlTags } from '../../lib';
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
  const selectedPodcast = location.state?.podcast;

  const imageUrl =
    selectedEpisodeIndex !== null
      ? episodes[selectedEpisodeIndex]?.artworkUrl600
      : selectedPodcast?.artworkUrl600;
  const title =
    selectedEpisodeIndex !== null
      ? episodes[selectedEpisodeIndex]?.trackName
      : selectedPodcast?.trackName;

  const handleNavigateHome = () => {
    navigate('/');
  };

  const handleIconButtonClick = (index: number | null) => {
    if (index !== null) {
      if (selectedEpisodeIndex === index) {
        onPlayPause('episode');
      } else {
        if (isPlaying) {
          onPlayPause('podcast');
        }
        setSelectedEpisodeIndex(index);
        onPlayPause('episode');
      }
    } else {
      onPlayPause('podcast');
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
    setSelectedEpisodeIndex(null);
    if (podcastId) {
      fetchEpisodes(Number(podcastId));
    }
  }, [podcastId, fetchEpisodes, setSelectedEpisodeIndex]);

  if (episodesLoading) return <p>Loading...</p>;
  if (episodesError) return <p>Error: {episodesError.message}</p>;

  return (
    <>
      <div className="pt-30 mb-114 flex flex-col items-center w-screen">
        <div className="flex items-center">
          <IconButton
            onClick={handleNavigateHome}
            className="w-100 h-100 p-0 px-5 rounded-15 space-x-10"
          >
            <img src="/images/vector2.svg" alt="Your SVG Description" className="w-9.879 h-5" />
          </IconButton>
          <HeaderSearch
            searchTerm={searchTerm}
            onSearchTermChange={handleSearchTermChange}
            onSearch={handleSearch}
            className="w-[757px]"
          />
        </div>
      </div>

      {
        <div className="flex justify-center items-center w-screen">
          <div className="mt-42 mb-5 mx-auto">
            <img
              src={imageUrl}
              alt={title}
              className="w-822 h-280 rounded-15 bg-cover bg-no-repeat"
            />

            <div className="flex justify-between items-center w-832 h-60 ">
              <IconButton
                onClick={() => handleIconButtonClick(selectedEpisodeIndex)}
                className="pl-0"
              >
                {isPlaying ? (
                  <div className="bg-custom-blue5C rounded-71 w-60 h-60 flex items-center justify-center">
                    <img src="/images/pause-1.svg" alt="Pause" className="w-6 h-6" />
                  </div>
                ) : (
                  <img src="/images/play-1.svg" alt="Play Icon" className="w-6 h-6 flex-shrink-0" />
                )}
              </IconButton>
              <div className="flex justify-center items-center max-w-645">
                <h1 className="whitespace-nowrap overflow-hidden text-overflow-ellipsis m-0 max-w-580 max-h-60 font-quicksand text-white text-32 font-bold leading-normal tracking-tightest">
                  {title}
                </h1>
                <img src="/images/verify-1.svg" alt="Check images" className="ml-2" />
              </div>
              <div className="flex items-center flex-shrink-0">
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
      }

      <div className="flex justify-center  w-screen">
        <Table className="w-832 mt-19 border-b border-transparent-white-03">
          <TableHead>
            <TableRow>
              <TableCell className="p-0 h-10 text-custom-whiteTransparent font-quicksand font-600 text-16 leading-normal border-b border-transparent-white-03 -mt-1 tracking-normal text-left">
                #
              </TableCell>
              <TableCell className="p-0 h-10 text-custom-whiteTransparent font-quicksand font-600 text-14 leading-normal border-b border-transparent-white-03">
                Title
              </TableCell>
              <TableCell className="p-0 h-10 text-custom-whiteTransparent font-quicksand font-600 text-14 leading-normal w-98 border-b border-transparent-white-03">
                Topic
              </TableCell>
              <TableCell className="p-0 h-10 text-custom-whiteTransparent font-quicksand font-600 text-14 leading-normal w-98 border-b border-transparent-white-03">
                Released
              </TableCell>
              <TableCell className="p-0 h-10 text-custom-whiteTransparent font-quicksand font-600 text-14 leading-normal w-98 border-b border-transparent-white-03">
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
                <TableCell className="p-0 h-80 w-50 border-b border-transparent-white-03">
                  <IconButton onClick={() => handleIconButtonClick(index)} className="pl-0">
                    {selectedEpisodeIndex === index && isPlaying ? (
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
                    src={episode.artworkUrl160}
                    alt={episode.trackName}
                    className="w-45 h-45 rounded-8 bg-custom-black1A bg-cover bg-no-repeat"
                  />
                  <div className="ml-5 w-198 h-38 flex flex-col">
                    <span className="text-custom-white font-quicksand font-500 text-16 leading-normal no-underline truncate ">
                      {episode.trackName}
                    </span>
                    <span className="text-custom-whiteTransparent font-quicksand font-500 text-14 leading-normal no-underline truncate ">
                      {episode.collectionName}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="p-0 border-transparent-white-03 w-242 ">
                  <div className="w-210 h-10  text-custom-whiteTransparent font-quicksand font-500 text-16 leading-normal no-underline truncate border-b ">
                    {removeHtmlTags(episode.description || 'Loading...')}
                  </div>
                </TableCell>
                <TableCell className="p-0 h-20 w-134 text-custom-whiteTransparent font-quicksand font-500 text-16 leading-normal border-b border-transparent-white-03">
                  {timeSince(episode.releaseDate)}
                </TableCell>
                <TableCell className="p-0  h-5  text-custom-whiteTransparent font-quicksand font-500 text-16 leading-normal border-b border-transparent-white-03">
                  <div className="w-37">{formatTime(episode.trackTimeMillis)}</div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};
