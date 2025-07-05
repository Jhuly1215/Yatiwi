import { useEffect, useState } from 'react';
import { getLessonsBySubject } from '../services/lessons';

export const useLessons = (subjectId: string) => {
  const [lessons, setLessons] = useState<any[]>([]);

  useEffect(() => {
    if (!subjectId) return;
    getLessonsBySubject(subjectId).then(setLessons);
  }, [subjectId]);

  return lessons;
};