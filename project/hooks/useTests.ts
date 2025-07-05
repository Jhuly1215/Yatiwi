// File: project/hooks/useTests.ts

import { useState, useEffect } from 'react';
import {
  getTestQuestions,
  TestQuestionRow
} from '../src/database/testQuestions';

interface UseTestsResult {
  items: TestQuestionRow[];
  loading: boolean;
  error: Error | null;
  reload: () => void;
}

/**
 * Hook para obtener las preguntas de test de una lección desde SQLite.
 * @param lessonId ID de la lección para filtrar las preguntas
 */
export function useTests(lessonId: string): UseTestsResult {
  const [items, setItems] = useState<TestQuestionRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getTestQuestions(lessonId);
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
