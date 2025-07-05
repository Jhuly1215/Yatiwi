import { useState, useEffect } from 'react';
import {
  getFavorites,
  insertFavorite,
  deleteFavorite,
  FavoriteRow
} from '../src/database/favorites';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

export function useLocalFavorites() {
  const { userId } = useContext(UserContext);
  const [items, setItems] = useState<FavoriteRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // Carga la lista de favoritos desde SQLite
  const load = async () => {
    setLoading(true);
    try {
      const data = await getFavorites(userId);
      setItems(data);
    } catch (e: any) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  // Ejecuta la carga al montar y cada vez que cambie userId
  useEffect(() => {
    load();
  }, [userId]);

  // Añade un favorito y recarga
  const addFavorite = async (lessonId: string): Promise<string> => {
    const id = await insertFavorite(userId, lessonId);
    await load();
    return id;
  };

  // Elimina un favorito y recarga
  const removeFavorite = async (favId: string): Promise<void> => {
    await deleteFavorite(favId);
    await load();
  };

  return {
    items,
    loading,
    error,
    reload: load,
    addFavorite,
    removeFavorite,
  };
}