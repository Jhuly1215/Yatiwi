// File: project/hooks/useMaterials.ts

import { useState, useEffect } from 'react';
import {
  getMaterialsByLesson,
  MaterialRow
} from '../src/database/materials';

interface UseLocalMaterialsResult {
  items: MaterialRow[];
  loading: boolean;
  error: Error | null;
  reload: () => void;
}

/**
 * Hook para obtener materiales de una lección offline.
 * @param lessonId ID de la lección para filtrar materiales
 */
export function useMaterials(lessonId: string): UseLocalMaterialsResult {
  const [items, setItems] = useState<MaterialRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getMaterialsByLesson(lessonId);
      setItems(data);
    } catch (e: any) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (lessonId) {
      load();
    }
  }, [lessonId]);

  return {
    items,
    loading,
    error,
    reload: load,
  };
}
