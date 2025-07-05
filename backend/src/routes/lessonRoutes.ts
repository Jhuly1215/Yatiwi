import { Router } from 'express';
import { LessonController } from '../controllers/lessonController';

const router = Router();

router.post('/lessons', LessonController.createLesson);
router.get('/lessons/:id', LessonController.getLesson);
router.get('/subjects/:subject_id/lessons', LessonController.getLessonsBySubject);

export default router;
