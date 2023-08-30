import React, { useState, useEffect, useCallback } from 'react';
import { IconButton, Slider } from '@mui/material';
import { getPodcastFeed } from '../services';
import { PodcastData, Podcast } from '../lib/types';
import { formatTime } from '../lib';

interface PodcastPlayerProps {
  data: Podcast | PodcastData['episodes'][0];
  onNext: () => void;
  onPrevious: () => void;
  isPlaying: boolean;
  onPlayPause: (type: 'podcast' | 'episode') => void;
  playingType: 'podcast' | 'episode' | null;
  selectedPodcastIndex?: number | null;
  setSelectedPodcastIndex?: React.Dispatch<React.SetStateAction<number | null>>;
  onEpisodeNext?: () => void;
  onEpisodePrevious?: () => void;
}

export const PodcastPlayer: React.FC<PodcastPlayerProps> = ({
  data,
  onNext,
  onPrevious,
  isPlaying,
  onPlayPause,
  playingType,
  onEpisodeNext,
  onEpisodePrevious,
}) => {
  const [isRepeating, setIsRepeating] = useState(false);
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);
  const [audio] = useState(new Audio());
  const [volume, setVolume] = useState(0.5);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [isShuffled, setIsShuffled] = useState(false);

  const artworkUrl =
    playingType === 'podcast'
      ? (data as Podcast)?.artworkUrl100
      : (data as PodcastData['episodes'][0])?.artworkUrl160 || '';

  const title =
    playingType === 'podcast'
      ? (data as Podcast).collectionName
      : (data as PodcastData['episodes'][0])?.trackName;
  const subtitle =
    playingType === 'podcast'
      ? (data as Podcast).artistName
      : (data as PodcastData['episodes'][0])?.collectionName;

  const trackTimeMillis =
    playingType === 'podcast'
      ? (data as Podcast).trackTimeMillis
      : (data as PodcastData['episodes'][0])?.trackTimeMillis;

  const elapsedTimePercentage = (elapsedTime / trackTimeMillis) * 100;

  const handleCanPlay = useCallback(() => {
    if (isPlaying) {
      audio.play().catch((error) => {
        console.error('La reproducción falló.', error);
      });
    }
  }, [isPlaying, audio]);

  const handlePlayPauseClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((error) => {
        console.error('La reproducción falló.', error);
      });
    }
    if (playingType !== null) {
      onPlayPause(playingType);
    }
  };
  const handleShuffleClick = () => {
    setIsShuffled(!isShuffled);
  };

  useEffect(() => {
    if (playingType === 'podcast') {
      const fetchEpisodes = async () => {
        try {
          const eps = (await getPodcastFeed((data as Podcast).feedUrl)).filter(
            (e): e is string => e !== null,
          );
          setCurrentUrl(eps[0] || null);
        } catch (error) {
          console.error('Error fetching episodes:', error);
        }
      };

      fetchEpisodes();
    } else {
      if (data && (data as PodcastData['episodes'][0]).episodeUrl) {
        setCurrentUrl((data as PodcastData['episodes'][0]).episodeUrl);
      }
    }
  }, [playingType, data]);

  useEffect(() => {
    audio.addEventListener('canplay', handleCanPlay);

    if (currentUrl) {
      audio.src = currentUrl;
      audio.load();
    }

    return () => {
      audio.removeEventListener('canplay', handleCanPlay);
      audio.pause();
    };
  }, [audio, currentUrl, isPlaying, handleCanPlay]);

  useEffect(() => {
    audio.volume = volume;
  }, [volume, audio]);

  useEffect(() => {
    const handleTimeUpdate = () => {
      setElapsedTime(audio.currentTime * 1000);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [audio]);

  return (
    <div className="flex items-center bg-custom-black1A fixed bottom-0 w-full h-110">
      <div className="flex items-center space-x-4">
        <img src={artworkUrl} alt="Artwork" className="w-110 h-110 mr-1 rounded" />
        <div className="w-277 h-10">
          <h2 className="m-0 text-custom-white font-quicksand text-16 font-500 truncate">
            {title}
          </h2>
          <p className="m-0 text-custom-whiteTransparent font-quicksand text-16 font-500 truncate">
            {subtitle}
          </p>
        </div>
      </div>
      <div className="flex items-center ml-59 space-x-2 w-831 h-50">
        <IconButton onClick={handleShuffleClick}>
          <img
            src="/images/shuffle-1.svg"
            alt="Shuffle Icon"
            className={`w-6 h-6 ${isShuffled ? 'filter brightness-0 saturate-0' : ''}`}
          />
        </IconButton>
        <IconButton onClick={playingType === 'podcast' ? onPrevious : onEpisodePrevious}>
          <img src="/images/step-forward-2.svg" alt="Step Backward Icon" className="w-6 h-6" />
        </IconButton>
        <IconButton onClick={handlePlayPauseClick}>
          {isPlaying ? (
            <div className="bg-custom-blue5C rounded-71 w-50 h-50 flex items-center justify-center px-15 py-15">
              <img
                src="/images/pause-1.svg"
                alt="Pause"
                className="w-18.75 h-18.75 flex-shrink-0"
              />
            </div>
          ) : (
            <div className="pl-2">
              <img src="/images/play-1.svg" alt="Play" className="w-18.75 h-18.75 flex-shrink-0" />
            </div>
          )}
        </IconButton>
        <IconButton onClick={playingType === 'podcast' ? onNext : onEpisodeNext}>
          <img src="/images/step-forward-1.svg" alt="Step Forward Icon" className="w-6 h-6" />
        </IconButton>
        <IconButton onClick={() => setIsRepeating(!isRepeating)}>
          <img
            src="/images/rotate-right-1.svg"
            alt="Rotate Right Icon"
            className={`w-6 h-6 ${isRepeating ? 'filter brightness-0 saturate-0' : ''}`}
          />
        </IconButton>
        <span className="text-custom-white font-quicksand mr-2">{formatTime(elapsedTime)}</span>
        <Slider
          aria-label="Playback time"
          value={elapsedTimePercentage}
          className="w-419 h-[5px] hide-thumb slider-white"
          onChange={(event, newValue) => {
            if (typeof newValue === 'number') {
              const newElapsedTime = (newValue / 100) * trackTimeMillis;
              setElapsedTime(newElapsedTime);
            }
          }}
        />
        <span className="ml-2 text-custom-white font-quicksand">{formatTime(trackTimeMillis)}</span>
        <IconButton>
          <img src="/images/volume-1.svg" alt="Volume Icon" className="w-6 h-6" />
        </IconButton>
        <Slider
          aria-label="Volume control"
          value={volume * 100}
          onChange={(_, newValue) => {
            if (typeof newValue === 'number') {
              setVolume(newValue / 100);
            }
          }}
          className="w-100 h-[5px] hide-thumb slider-white"
        />
      </div>
    </div>
  );
};
