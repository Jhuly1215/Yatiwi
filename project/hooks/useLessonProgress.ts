// File: project/hooks/useLessonProgress.ts

import { useState, useEffect } from 'react';
import {
  getLessonProgress,
  LessonProgressRow
} from '../src/database/lessonProgress';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

export function useLessonProgress() {
  const { userId } = useContext(UserContext);
  const [items, setItems] = useState<LessonProgressRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getLessonProgress(userId);
      setItems(data);
    } catch (e: any) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [userId]);

  return { items, loading, error, reload: load };
}
