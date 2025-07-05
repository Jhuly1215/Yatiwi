import { Router } from 'express';
import { ProgressController } from '../controllers/progressController';

const router = Router();

router.post('/progress', ProgressController.saveProgress);
router.get('/progress/:user_id', ProgressController.getUserProgress);

export default router;
