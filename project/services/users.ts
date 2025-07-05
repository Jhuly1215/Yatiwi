// src/services/users.ts
import { api } from './api';

const API = '/api';

export const getUserById = async (userId: string) => {
  try {
    const res = await api.get(`${API}/users/${userId}`);
    return res.data;
  } catch (error) {
    console.error(`❌ Error al obtener usuario con ID ${userId}:`, error);
    throw error;
  }
};

export const createUser = async (data: any) => {
  try {
    const res = await api.post(`${API}/users`, data);
    return res.data;
  } catch (error) {
    console.error('❌ Error al crear usuario:', error);
    throw error;
  }
};

export const deleteUser = async (userId: string) => {
  try {
    const res = await api.delete(`${API}/users/${userId}`);
    return res.data;
  } catch (error) {
    console.error(`❌ Error al eliminar usuario con ID ${userId}:`, error);
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const res = await api.get(`${API}/users`);
    return res.data;
  } catch (error) {
    console.error('❌ Error al obtener todos los usuarios:', error);
    throw error;
  }
};
