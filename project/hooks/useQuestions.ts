import { useEffect, useState } from 'react';
import { getQuestionsByLesson } from '../services/questions';

export const useQuestions = (lessonId: string) => {
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    if (!lessonId) return;
    getQuestionsByLesson(lessonId).then(setQuestions);
  }, [lessonId]);

  return questions;
};