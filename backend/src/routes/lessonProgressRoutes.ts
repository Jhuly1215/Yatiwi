import { Router } from 'express';
import { LessonProgressController } from '../controllers/lessonProgressController';

const router = Router();

router.post('/lesson-progress', LessonProgressController.saveProgress);
router.get('/lesson-progress/:user_id/:lesson_id', LessonProgressController.getProgress);

export default router;
