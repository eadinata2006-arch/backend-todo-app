import { Router } from 'express';
import authRoutes from './authRoutes';
import todoRoutes from './todoRoutes';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.use('/auth', authRoutes);
router.use('/todos', authMiddleware, todoRoutes);

export default router;