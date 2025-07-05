// src/services/favorites.ts
import { api } from './api';

const API = '/api';

export const addFavorite = async (data: any) => {
  try {
    const res = await api.post(`${API}/favorites`, data);
    return res.data;
  } catch (error) {
    console.error('❌ Error al agregar a favoritos:', error);
    throw error;
  }
};

export const getFavoritesByUser = async (userId: string) => {
  try {
    const res = await api.get(`${API}/users/${userId}/favorites`);
    return res.data;
  } catch (error) {
    console.error(`❌ Error al obtener favoritos del usuario ${userId}:`, error);
    throw error;
  }
};

export const removeFavorite = async (favoriteId: string) => {
  try {
    const res = await api.delete(`${API}/favorites/${favoriteId}`);
    return res.data;
  } catch (error) {
    console.error(`❌ Error al eliminar favorito ${favoriteId}:`, error);
    throw error;
  }
};