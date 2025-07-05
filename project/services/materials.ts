// src/services/materials.ts
import { api } from './api';

const API = '/api';

export const getMaterialsByLesson = async (lessonId: string) => {
  try {
    const res = await api.get(`${API}/lessons/${lessonId}/materials`);
    return res.data;
  } catch (error) {
    console.error(`❌ Error al obtener materiales de la lección ${lessonId}:`, error);
    throw error;
  }
};

export const deleteMaterial = async (materialId: string) => {
  try {
    const res = await api.delete(`${API}/materials/${materialId}`);
    return res.data;
  } catch (error) {
    console.error(`❌ Error al eliminar material ${materialId}:`, error);
    throw error;
  }
};

export const createMaterial = async (data: any) => {
  try {
    const res = await api.post(`${API}/materials`, data);
    return res.data;
  } catch (error) {
    console.error('❌ Error al crear material:', error);
    throw error;
  }
};
