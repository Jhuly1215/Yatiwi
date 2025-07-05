import { Request, Response } from 'express';
import { FavoriteModel } from '../models/favoriteModel';
import { v4 as uuid } from 'uuid';

export const FavoriteController = {
  async addFavorite(req: Request, res: Response) {
    try {
      const { user_id, lesson_id } = req.body;
      const newFav = { id: uuid(), user_id, lesson_id };
      await FavoriteModel.addFavorite(newFav);
      res.status(201).json({ message: "Favorite added", favorite: newFav });
    } catch {
      res.status(500).json({ error: "Failed to add favorite" });
    }
  },

  async getUserFavorites(req: Request, res: Response) {
    try {
      const favs = await FavoriteModel.getFavoritesByUser(req.params.user_id);
      res.json(favs);
    } catch {
      res.status(500).json({ error: "Failed to retrieve favorites" });
    }
  },

  async removeFavorite(req: Request, res: Response) {
    try {
      await FavoriteModel.removeFavorite(req.params.id);
      res.json({ message: "Favorite removed" });
    } catch {
      res.status(500).json({ error: "Failed to remove favorite" });
    }
  }
};
