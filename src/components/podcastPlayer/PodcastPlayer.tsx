import React, { useState, useEffect } from "react";
import { IconButton, Slider } from "@mui/material";
import {
  PlayArrow,
  Pause,
  SkipPrevious,
  SkipNext,
  VolumeUp,
  Repeat as RepeatIcon,
} from "@mui/icons-material";
import { getPodcastFeed } from "../../services";

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

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const eps = (await getPodcastFeed(podcast.feedUrl)).filter(
          (e): e is string => e !== null
        );
        setCurrentEpisode(eps[0] || null);
      } catch (error) {
        console.error("Error fetching episodes:", error);
      }
    };

    fetchEpisodes();
  }, [podcast.feedUrl]);

  useEffect(() => {
    if (audio.readyState === 4) {
      if (isPlaying) {
        audio.play().catch((error) => {
          console.error("La reproducción falló.", error);
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
          console.error("La reproducción falló.", error);
        });
      }
    }

    return () => {
      audio.pause();
    };
  }, [audio, currentEpisode, isPlaying]);

  return (
    <div className="flex items-center bg-gray-100 p-4 fixed bottom-0 w-full">
      <div className="flex items-center space-x-4">
        <img
          src={podcast.artworkUrl100}
          alt="Podcast artwork"
          className="w-16 h-16 mr-4 rounded"
        />
        <div>
          <h2 className="text-xl">{podcast.collectionName}</h2>
          <p>{podcast.artistName}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <IconButton onClick={onPrevious}>
          <SkipPrevious />
        </IconButton>
        <IconButton onClick={onPlayPause}>
          {isPlaying ? <Pause /> : <PlayArrow />}
        </IconButton>

        <IconButton onClick={onNext}>
          <SkipNext />
        </IconButton>
        <IconButton onClick={() => setIsRepeating(!isRepeating)}>
          {isRepeating ? (
            <RepeatIcon style={{ color: "green" }} />
          ) : (
            <RepeatIcon />
          )}
        </IconButton>
        <Slider aria-label="Podcast time" defaultValue={30} className="w-24" />
        <IconButton>
          <VolumeUp />
        </IconButton>
        <Slider
          aria-label="Volume control"
          defaultValue={30}
          className="w-24"
        />
      </div>
    </div>
  );
};
