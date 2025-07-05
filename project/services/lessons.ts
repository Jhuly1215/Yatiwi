// src/services/lessons.ts
import { api } from './api';

const API = '/api';

export const getSubjects = async () => {
  try {
    const res = await api.get(`${API}/subjects`);
    return res.data;
  } catch (error) {
    console.error('❌ Error al obtener subjects:', error);
    throw error;
  }
};

export const getSubjectById = async (subjectId: string) => {
  try {
    const res = await api.get(`${API}/subjects/${subjectId}`);
    return res.data;
  } catch (error) {
    console.error(`❌ Error al obtener subject ${subjectId}:`, error);
    throw error;
  }
};

export const getLessonsBySubject = async (subjectId: string) => {
  try {
    const res = await api.get(`${API}/subjects/${subjectId}/lessons`);
    return res.data;
  } catch (error) {
    console.error(`❌ Error al obtener lessons del subject ${subjectId}:`, error);
    throw error;
  }
};

export const getLessonById = async (lessonId: string) => {
  try {
    const res = await api.get(`${API}/lessons/${lessonId}`);
    return res.data;
  } catch (error) {
    console.error(`❌ Error al obtener lesson ${lessonId}:`, error);
    throw error;
  }
};

export const getLessonsToday = async (userId: string) => {
  try {
    const res = await api.get(`${API}/lessons/today?userId=${userId}`);
    return res.data;
  } catch (error) {
    console.error(`❌ Error al obtener lessons de hoy para user ${userId}:`, error);
    throw error;
  }
};
