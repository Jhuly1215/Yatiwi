import { useEffect, useState } from 'react';
import { getFavoritesByUser } from '../services/favorites';

export const useFavorites = (userId: string) => {
  const [favorites, setFavorites] = useState<any[]>([]);

  useEffect(() => {
    if (!userId) return;
    getFavoritesByUser(userId).then(setFavorites);
  }, [userId]);

  return favorites;
};