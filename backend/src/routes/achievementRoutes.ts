import { Router } from 'express';
import { AchievementController } from '../controllers/achievementController';

const router = Router();

// Logros generales
router.post('/achievements', AchievementController.createAchievement);
router.get('/achievements', AchievementController.listAchievements);

// Logros por usuario
router.post('/user-achievements', AchievementController.assignToUser);
router.get('/users/:user_id/achievements', AchievementController.getUserAchievements);

export default router;
