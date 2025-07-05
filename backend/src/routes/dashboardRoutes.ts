import { Router } from 'express';
import { DashboardController } from '../controllers/dashboardController';

const router = Router();

router.get('/users/:user_id/summary', DashboardController.getSummary);
router.get('/users/:user_id/progress/weekly', DashboardController.getWeeklyProgress);
router.get('/users/:user_id/progress/subjects', DashboardController.getSubjectProgress);
router.get('/users/:user_id/stats', DashboardController.getStats);

export default router;
