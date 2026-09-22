import { Router } from 'express';
import { 
  getTodos, 
  getTodoById, 
  createTodo, 
  updateTodo, 
  deleteTodo 
} from '../controllers/todoController';
import { verifyToken } from '../middlewares/authMiddleware';
import { validateTodo, validateUpdateTodo } from '../middlewares/validator';

const router = Router();

router.use(verifyToken);

router.get('/', getTodos);
router.get('/:id', getTodoById);
router.post('/', validateTodo, createTodo);
router.put('/:id', validateUpdateTodo, updateTodo);
router.delete('/:id', deleteTodo);

export default router;