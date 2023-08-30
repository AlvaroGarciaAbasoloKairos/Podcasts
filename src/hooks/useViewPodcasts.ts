import { useState, useCallback } from 'react';
import { searchPodcasts } from '../services';
import { Podcast } from '../lib/types';

interface UseViewPodcastsReturnType {
  podcasts: Podcast[];
  loading: boolean;
  error: Error | null;
  search: (term: string, limit?: number) => Promise<void>;
  setPodcasts: React.Dispatch<React.SetStateAction<Podcast[]>>;
}
export const useViewPodcasts = (): UseViewPodcastsReturnType => {
  const [loading, setLoading] = useState(false);
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [error, setError] = useState<Error | null>(null);

  const search = useCallback(async (term: string, limit: number = 5) => {
    setLoading(true);
    setError(null);
    try {
      const results = await searchPodcasts(term, limit);
      setPodcasts(results);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { podcasts, loading, error, search, setPodcasts };
};
