import { Router } from 'express';
import { DownloadController } from '../controllers/downloadController';

const router = Router();

router.post('/downloads', DownloadController.createDownload);
router.get('/users/:user_id/downloads', DownloadController.getUserDownloads);
router.delete('/downloads/:id', DownloadController.deleteDownload);

export default router;
