import { Router } from 'express';
import { MaterialController } from '../controllers/materialController';

const router = Router();

router.post('/materials', MaterialController.createMaterial);
router.get('/lessons/:lesson_id/materials', MaterialController.getMaterialsByLesson);
router.delete('/materials/:id', MaterialController.deleteMaterial);

export default router;
