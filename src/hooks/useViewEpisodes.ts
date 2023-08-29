import { useState, useCallback } from 'react';
import { getEpisodes } from '../services';

export const useViewEpisodes = <T>() => {
  const [episodesLoading, setEpisodesLoading] = useState(false);
  const [episodes, setEpisodes] = useState<T[]>([]);
  const [episodesError, setEpisodesError] = useState<Error | null>(null);

  console.log('episodes------>', episodes);

  const fetchEpisodes = useCallback(async (podcastId: number, limit: number = 5) => {
    setEpisodesLoading(true);
    setEpisodesError(null);

    try {
      const results = await getEpisodes(podcastId, limit);
      console.log('----------------------------------->', results);
      setEpisodes(results.slice(0, limit) as T[]);
    } catch (err) {
      setEpisodesError(err as Error);
    } finally {
      setEpisodesLoading(false);
    }
  }, []);

  return { episodes, episodesLoading, episodesError, fetchEpisodes, setEpisodes };
};