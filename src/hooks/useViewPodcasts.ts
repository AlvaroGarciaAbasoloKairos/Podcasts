import { useState, useCallback } from 'react';
import { searchPodcasts } from '../services';
import { Podcast } from '../lib/types';

export const useViewPodcasts = () => {
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
