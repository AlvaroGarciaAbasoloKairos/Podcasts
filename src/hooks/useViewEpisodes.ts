import { useState, useCallback } from 'react';
import { getEpisodes } from '../services';

interface UseViewEpisodesReturnType<T> {
  episodes: T[];
  episodesLoading: boolean;
  episodesError: Error | null;
  fetchEpisodes: (podcastId: number, limit?: number) => Promise<void>;
  setEpisodes: React.Dispatch<React.SetStateAction<T[]>>;
}

export const useViewEpisodes = <T>(): UseViewEpisodesReturnType<T> => {
  const [episodesLoading, setEpisodesLoading] = useState(false);
  const [episodes, setEpisodes] = useState<T[]>([]);
  const [episodesError, setEpisodesError] = useState<Error | null>(null);

  const fetchEpisodes = useCallback(async (podcastId: number, limit: number = 5) => {
    setEpisodesLoading(true);
    setEpisodesError(null);

    try {
      const results = await getEpisodes(podcastId, limit);
      setEpisodes(results.slice(0, limit) as T[]);
    } catch (err) {
      setEpisodesError(err as Error);
    } finally {
      setEpisodesLoading(false);
    }
  }, []);

  return { episodes, episodesLoading, episodesError, fetchEpisodes, setEpisodes };
};
