import { Router } from 'express';
import { UserController } from '../controllers/userController';

const router = Router();

router.post('/users', UserController.createUser);
router.get('/users/:id', UserController.getUser);
router.get('/users', UserController.getAllUsers);
router.delete('/users/:id', UserController.deleteUser);

export default router;
