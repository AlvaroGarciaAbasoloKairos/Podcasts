import React from 'react';
import { IconButton, Slider } from '@mui/material';

interface PlayerControlsProps {
  artworkUrl: string;
  title: string;
  subtitle: string;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  isRepeating: boolean;
  setIsRepeating: React.Dispatch<React.SetStateAction<boolean>>;
  volume: number;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
}

export const PlayerControls: React.FC<PlayerControlsProps> = ({
  artworkUrl,
  title,
  subtitle,
  isPlaying,
  onPlayPause,
  onNext,
  onPrevious,
  isRepeating,
  setIsRepeating,
  volume,
  setVolume,
}) => {
  return (
    <div className="flex items-center bg-gray-100 p-4 fixed bottom-0 w-full">
      <div className="flex items-center space-x-4">
        <img src={artworkUrl} alt="Artwork" className="w-16 h-16 mr-4 rounded" />
        <div>
          <h2 className="text-xl">{title}</h2>
          <p>{subtitle}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <IconButton onClick={onPrevious}>
          <img src="/images/step-forward-2.svg" alt="Step Backward Icon" className="w-6 h-6" />
        </IconButton>

        <IconButton onClick={onPlayPause}>
          {isPlaying ? (
            <img src="/images/pause-1.svg" alt="Pause" className="w-15 h-15 flex-shrink-0" />
          ) : (
            <img src="/images/play-1.svg" alt="Play" className="w-15 h-15 flex-shrink-0" />
          )}
        </IconButton>

        <IconButton onClick={onNext}>
          <img src="/images/step-forward-1.svg" alt="Step Forward Icon" className="w-6 h-6" />
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

        <Slider aria-label="Playback time" defaultValue={30} className="w-24" />

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
