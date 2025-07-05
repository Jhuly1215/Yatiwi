// src/services/questions.ts
import { api } from './api';

const API = '/api';

export const getQuestionsByLesson = async (lessonId: string) => {
  try {
    const res = await api.get(`${API}/lessons/${lessonId}/questions`);
    return res.data;
  } catch (error) {
    console.error(`❌ Error al obtener preguntas de la lección ${lessonId}:`, error);
    throw error;
  }
};

export const createQuestion = async (data: any) => {
  try {
    const res = await api.post(`${API}/questions`, data);
    return res.data;
  } catch (error) {
    console.error('❌ Error al crear pregunta:', error);
    throw error;
  }
};
