import { Router } from 'express';
import { SubjectController } from '../controllers/subjectController';

const router = Router();

router.post('/subjects', SubjectController.createSubject);
router.get('/subjects/:id', SubjectController.getSubject);
router.get('/subjects', SubjectController.getAllSubjects);

export default router;
