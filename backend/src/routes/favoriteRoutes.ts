import { Router } from 'express';
import { FavoriteController } from '../controllers/favoriteController';

const router = Router();

router.post('/favorites', FavoriteController.addFavorite);
router.get('/users/:user_id/favorites', FavoriteController.getUserFavorites);
router.delete('/favorites/:id', FavoriteController.removeFavorite);

export default router;
