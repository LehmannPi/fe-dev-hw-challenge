import { useEffect, useState } from 'react';
import type { Lead } from '../types/leads';

export function useLeads(delay = 1500) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      fetch('/leads.json')
        .then((res) => {
          if (!res.ok) throw new Error('Failed to load leads');
          return res.json();
        })
        .then((data) => setLeads(data))
        .catch((err) => setError(err.message))
        .finally(() => setIsLoading(false));
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return { leads, isLoading, setLeads, error };
}
