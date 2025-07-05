import { useEffect, useState } from 'react';
import { getLessonProgress } from '../services/progress';

export const useLessonProgress = (userId: string, lessonId: string) => {
  const [progress, setProgress] = useState<any>(null);

  useEffect(() => {
    if (!userId || !lessonId) return;
    getLessonProgress(userId, lessonId).then(setProgress);
  }, [userId, lessonId]);

  return progress;
};