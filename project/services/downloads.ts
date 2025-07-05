// src/services/downloads.ts
import { api } from './api';

const API = '/api';

export const createDownload = async (data: any) => {
  try {
    const res = await api.post(`${API}/downloads`, data);
    return res.data;
  } catch (error) {
    console.error('❌ Error al crear descarga:', error);
    throw error;
  }
};

export const getDownloadsByUser = async (userId: string) => {
  try {
    const res = await api.get(`${API}/users/${userId}/downloads`);
    return res.data;
  } catch (error) {
    console.error(`❌ Error al obtener descargas del usuario ${userId}:`, error);
    throw error;
  }
};

export const deleteDownload = async (downloadId: string) => {
  try {
    const res = await api.delete(`${API}/downloads/${downloadId}`);
    return res.data;
  } catch (error) {
    console.error(`❌ Error al eliminar descarga ${downloadId}:`, error);
    throw error;
  }
};
