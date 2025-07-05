import { useMutation, useQueryClient } from 'react-query';
import api from '../services/api';
import { LessonProgress } from '../types';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

export const useUpsertLessonProgress = () => {
  const { userId } = useContext(UserContext);
  const qc = useQueryClient();
  return useMutation((data: Partial<LessonProgress>[]) =>
    api.post(`/users/${userId}/lesson-progress`, data)
  , {
    onSuccess: () => qc.invalidateQueries(['lessonProgress', userId])
  });
};
