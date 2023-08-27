import React, { useState, useEffect } from 'react';
import { IconButton, Slider } from '@mui/material';
import { getPodcastFeed } from '../../services';

interface Podcast {
  artworkUrl100: string;
  collectionName: string;
  artistName: string;
  feedUrl: string;
}

interface PodcastPlayerProps {
  podcast: Podcast;
  onNext: () => void;
  onPrevious: () => void;
  selectedPodcastIndex: number | null;
  setSelectedPodcastIndex: React.Dispatch<React.SetStateAction<number | null>>;
  podcasts: Podcast[];
  isPlaying: boolean;
  onPlayPause: () => void;
}

export const PodcastPlayer: React.FC<PodcastPlayerProps> = ({
  podcast,
  onNext,
  onPrevious,
  isPlaying,
  onPlayPause,
}) => {
  const [isRepeating, setIsRepeating] = useState(false);
  const [currentEpisode, setCurrentEpisode] = useState<string | null>(null);
  const [audio] = useState(new Audio());
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const eps = (await getPodcastFeed(podcast.feedUrl)).filter((e): e is string => e !== null);
        setCurrentEpisode(eps[0] || null);
      } catch (error) {
        console.error('Error fetching episodes:', error);
      }
    };

    fetchEpisodes();
  }, [podcast.feedUrl]);

  useEffect(() => {
    if (audio.readyState === 4) {
      if (isPlaying) {
        audio.play().catch((error) => {
          console.error('La reproducción falló.', error);
        });
      } else {
        audio.pause();
      }
    }
  }, [isPlaying, audio]);

  useEffect(() => {
    if (currentEpisode) {
      audio.src = currentEpisode;
      audio.load();
      if (isPlaying) {
        audio.play().catch((error) => {
          console.error('La reproducción falló.', error);
        });
      }
    }
    return () => {
      audio.pause();
    };
  }, [audio, currentEpisode, isPlaying]);

  useEffect(() => {
    audio.volume = volume;
  }, [volume, audio]);

  return (
    <div className="flex items-center bg-gray-100 p-4 fixed bottom-0 w-full">
      <div className="flex items-center space-x-4">
        <img src={podcast.artworkUrl100} alt="Podcast artwork" className="w-16 h-16 mr-4 rounded" />
        <div>
          <h2 className="text-xl">{podcast.collectionName}</h2>
          <p>{podcast.artistName}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <IconButton>
          <img src="/images/shuffle-1.svg" alt="Shuffle Icon" className="w-6 h-6" />
        </IconButton>
        <IconButton onClick={onPrevious}>
          <img src="/images/step-forward-2.svg" alt="Step Forward Icon" className="w-6 h-6" />
        </IconButton>
        <IconButton onClick={onPlayPause}>
          {isPlaying ? (
            <div className="bg-custom-blue5C rounded-71 w-30 h-30 flex items-center justify-center px-15 py-15">
              <img
                src="/images/pause-1.svg"
                alt="Pause"
                className="w-11.25 h-11.25 flex-shrink-0"
              />
            </div>
          ) : (
            <img src="/images/play-1.svg" alt="Play" className="w-15 h-15 flex-shrink-0" />
          )}
        </IconButton>

        <IconButton onClick={onNext}>
          <img src="/images/step-forward-1.svg" alt="Step Forward 1 Icon" className="w-6 h-6" />
        </IconButton>
        <IconButton onClick={() => setIsRepeating(!isRepeating)}>
          {isRepeating ? (
            <img
              src="/images/rotate-right-1.svg"
              alt="Rotate Right Icon"
              className="w-6 h-6 text-green-500"
            />
          ) : (
            <img src="/images/rotate-right-1.svg" alt="Rotate Right Icon" className="w-6 h-6" />
          )}
        </IconButton>

        <Slider aria-label="Podcast time" defaultValue={30} className="w-24" />
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
          className="w-24"
        />
      </div>
    </div>
  );
};
