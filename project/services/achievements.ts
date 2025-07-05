// src/services/achievements.ts
import { api } from './api';

const API = '/api';

export const getUserAchievements = async (userId: string) => {
  try {
    const res = await api.get(`${API}/users/${userId}/achievements`);
    return res.data;
  } catch (error) {
    console.error(`❌ Error al obtener logros del usuario ${userId}:`, error);
    throw error;
  }
};

export const assignAchievement = async (data: any) => {
  try {
    const res = await api.post(`${API}/user-achievements`, data);
    return res.data;
  } catch (error) {
    console.error('❌ Error al asignar logro:', error);
    throw error;
  }
};

export const getAllAchievements = async () => {
  try {
    const res = await api.get(`${API}/achievements`);
    return res.data;
  } catch (error) {
    console.error('❌ Error al obtener todos los logros:', error);
    throw error;
  }
};

export const createAchievement = async (data: any) => {
  try {
    const res = await api.post(`${API}/achievements`, data);
    return res.data;
  } catch (error) {
    console.error('❌ Error al crear un logro:', error);
    throw error;
  }
};
