// File: project/hooks/useLessons.ts

import { useState, useEffect } from 'react';
import { getLessonsBySubject, LessonRow } from '../src/database/lessons';

interface UseLocalLessonsResult {
  items: LessonRow[];
  loading: boolean;
  error: Error | null;
  reload: () => void;
}

/**
 * Hook para obtener lecciones de un módulo (o subject) offline.
 * @param subjectId ID del módulo/subject para filtrar lecciones
 */
export function useLessons(subjectId: string): UseLocalLessonsResult {
  const [items, setItems] = useState<LessonRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getLessonsBySubject(subjectId);
      setItems(data);
    } catch (e: any) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (subjectId) {
      load();
    }
  }, [subjectId]);

  return {
    items,
    loading,
    error,
    reload: load,
  };
}
