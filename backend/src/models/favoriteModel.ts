import { getDB } from '../utils/db';
import { Favorite, FavoriteCreate } from '../types/favoriteTypes';

export const FavoriteModel = {
  async addFavorite(fav: FavoriteCreate): Promise<void> {
    const db = await getDB();
    await db.run(`
      INSERT INTO favorites (id, user_id, lesson_id)
      VALUES (?, ?, ?)`,
      fav.id, fav.user_id, fav.lesson_id
    );
  },

  async getFavoritesByUser(user_id: string): Promise<Favorite[]> {
    const db = await getDB();
    return db.all<Favorite[]>(`SELECT * FROM favorites WHERE user_id = ?`, user_id);
  },

  async removeFavorite(id: string): Promise<void> {
    const db = await getDB();
    await db.run(`DELETE FROM favorites WHERE id = ?`, id);
  }
};
