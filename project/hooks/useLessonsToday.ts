// src/hooks/useLessonsToday.ts
import { useEffect, useState } from 'react';
import { getLessonsToday } from '@/services/lessons';

export const useLessonsToday = (userId: string) => {
  const [lessons, setLessons] = useState<any[]>([]);

  useEffect(() => {
    if (!userId) return;
    getLessonsToday(userId).then(setLessons);
  }, [userId]);

  return lessons;
};
