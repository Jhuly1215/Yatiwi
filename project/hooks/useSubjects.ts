// File: project/hooks/useSubjects.ts

import { useState, useEffect } from 'react';
import {
  getAllSubjects,
  SubjectRow
} from '../src/database/subjects';

interface UseLocalSubjectsResult {
  items: SubjectRow[];
  loading: boolean;
  error: Error | null;
  reload: () => void;
}

/**
 * Hook para obtener la lista de subjects offline.
 */
export function useSubjects(): UseLocalSubjectsResult {
  const [items, setItems] = useState<SubjectRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getAllSubjects();
      setItems(data);
    } catch (e: any) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return {
    items,
    loading,
    error,
    reload: load,
  };
}
