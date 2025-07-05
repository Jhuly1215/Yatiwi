// src/services/dashboard.ts
import { api } from './api';

const API = '/api';

export const getUserSummary = async (userId: string) => {
  try {
    const res = await api.get(`${API}/users/${userId}/summary`);
    return res.data;
  } catch (error) {
    console.error(`❌ Error al obtener resumen del usuario ${userId}:`, error);
    throw error;
  }
};

export const getWeeklyProgress = async (userId: string) => {
  try {
    const res = await api.get(`${API}/users/${userId}/progress/weekly`);
    return res.data;
  } catch (error) {
    console.error(`❌ Error al obtener progreso semanal del usuario ${userId}:`, error);
    throw error;
  }
};

export const getSubjectProgress = async (userId: string) => {
  try {
    const res = await api.get(`${API}/users/${userId}/progress/subjects`);
    return res.data;
  } catch (error) {
    console.error(`❌ Error al obtener progreso por materia del usuario ${userId}:`, error);
    throw error;
  }
};

export const getUserStats = async (userId: string) => {
  try {
    const res = await api.get(`${API}/users/${userId}/stats`);
    return res.data;
  } catch (error) {
    console.error(`❌ Error al obtener estadísticas del usuario ${userId}:`, error);
    throw error;
  }
};
