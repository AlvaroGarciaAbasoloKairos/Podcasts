import React, { useState, useEffect } from 'react';
import { getPodcastFeed } from '../services';
import {PlayerControls} from '../components/PlayerControls'
import {Podcast} from '../lib/types'

interface PodcastPlayerProps {
  podcast: Podcast;
  onNext: () => void;
  onPrevious: () => void;
  selectedPodcastIndex: number | null;
  setSelectedPodcastIndex: React.Dispatch<React.SetStateAction<number | null>>;
  podcasts: Podcast[];
  isPlaying: boolean;
  onPlayPause: (type: 'podcast' | 'episode') => void;
  playingType: 'podcast' | 'episode' | null;
}

export const PodcastPlayer: React.FC<PodcastPlayerProps> = ({
  podcast,
  onNext,
  onPrevious,
  isPlaying,
  onPlayPause,
  playingType,
}) => {
  const [isRepeating, setIsRepeating] = useState(false);
  const [currentEpisode, setCurrentEpisode] = useState<string | null>(null);
  const [audio] = useState(new Audio());
  const [volume, setVolume] = useState(0.5);

  const handleCanPlay = () => {
    if (isPlaying) {
      audio.play().catch((error) => {
        console.error('La reproducción falló.', error);
      });
    }
  };

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
    audio.addEventListener('canplay', handleCanPlay);

    if (currentEpisode) {
      audio.src = currentEpisode;
      audio.load();
    }

    return () => {
      audio.removeEventListener('canplay', handleCanPlay);
      audio.pause();
    };
  }, [audio, currentEpisode, isPlaying]);

  useEffect(() => {
    audio.volume = volume;
  }, [volume, audio]);

  return (
    <PlayerControls
      artworkUrl={podcast.artworkUrl100}
      title={podcast.collectionName}
      subtitle={podcast.artistName}
      isPlaying={isPlaying}
      onPlayPause={() => onPlayPause('podcast')}
      onNext={onNext}
      onPrevious={onPrevious}
      isRepeating={isRepeating}
      setIsRepeating={setIsRepeating}
      volume={volume}
      setVolume={setVolume}
    />
  );
};
