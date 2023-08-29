import React, { useState, useEffect } from 'react';
import {PlayerControls} from '../components'
import {PodcastData} from '../lib/types'

interface EpisodePlayerProps {
  episode: PodcastData['episodes'][0];
  onNext: () => void;
  onPrevious: () => void;
  isPlaying: boolean;
  onPlayPause: (type: 'podcast' | 'episode') => void;
  playingType: 'podcast' | 'episode' | null;
}

export const EpisodePlayer: React.FC<EpisodePlayerProps> = ({
  episode,
  onNext,
  onPrevious,
  isPlaying,
  onPlayPause,
  playingType,
}) => {
  const [audio] = useState(new Audio());
  const [volume, setVolume] = useState(0.5);
  const [isRepeating, setIsRepeating] = useState(false);

  const handleCanPlay = () => {
    if (isPlaying) {
      audio.play().catch((error) => {
        console.error('La reproducción falló.', error);
      });
    }
  };

  useEffect(() => {
    audio.addEventListener('canplay', handleCanPlay);

    if (episode) {
      audio.src = episode.episodeUrl;
      audio.load();
    }

    return () => {
      audio.removeEventListener('canplay', handleCanPlay);
      audio.pause();
    };
  }, [audio, episode, isPlaying]);

  useEffect(() => {
    audio.volume = volume;
  }, [volume, audio]);

  return (
    <PlayerControls
      artworkUrl={episode.artworkUrl160}
      title={episode.trackName}
      subtitle={episode.collectionName}
      isPlaying={isPlaying}
      onPlayPause={() => onPlayPause('episode')}
      onNext={onNext}
      onPrevious={onPrevious}
      isRepeating={isRepeating}
      setIsRepeating={setIsRepeating}
      volume={volume}
      setVolume={setVolume}
    />
  );
};
