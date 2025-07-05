import { Router } from 'express';
import { QuestionController } from '../controllers/questionController';

const router = Router();

router.post('/questions', QuestionController.addQuestion);
router.get('/lessons/:lesson_id/questions', QuestionController.getQuestionsByLesson);

export default router;
