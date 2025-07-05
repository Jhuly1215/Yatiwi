// src/services/progress.ts
import { api } from './api';

const API = '/api';

export const saveLessonProgress = async (data: any) => {
  try {
    const res = await api.post(`${API}/lesson-progress`, data);
    return res.data;
  } catch (error) {
    console.error('❌ Error al guardar progreso de la lección:', error);
    throw error;
  }
};

export const getLessonProgress = async (userId: string, lessonId: string) => {
  try {
    const res = await api.get(`${API}/lesson-progress/${userId}/${lessonId}`);
    return res.data;
  } catch (error) {
    console.error(`❌ Error al obtener progreso de lección ${lessonId} para usuario ${userId}:`, error);
    throw error;
  }
};

export const saveDailyProgress = async (data: any) => {
  try {
    const res = await api.post(`${API}/progress`, data);
    return res.data;
  } catch (error) {
    console.error('❌ Error al guardar progreso diario:', error);
    throw error;
  }
};
