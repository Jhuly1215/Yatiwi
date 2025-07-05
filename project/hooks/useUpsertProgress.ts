// File: project/hooks/useUpsertLessonProgress.ts

import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { upsertLessonProgress, LessonProgressRow } from '../src/database/lessonProgress';
import { useCallback } from 'react';

export function useUpsertLessonProgress() {
  const { userId } = useContext(UserContext);

  const save = useCallback(async (row: Partial<LessonProgressRow>) => {
    await upsertLessonProgress({ ...row, user_id: userId } as LessonProgressRow);
  }, [userId]);

  return { save };
}
