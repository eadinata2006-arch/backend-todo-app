import { Router } from 'express';
import { 
  getTodos, 
  getTodoByIdHandler,
  createTodoHandler, 
  updateTodoHandler, 
  deleteTodoHandler 
} from '../controllers/todoController';
import { validateTodo, validateUpdateTodo } from '../middlewares/validator';

const router = Router();

router.get('/', getTodos);

router.get('/:id', getTodoByIdHandler);

router.post('/', validateTodo, createTodoHandler);

router.put('/:id', validateUpdateTodo, updateTodoHandler);

router.delete('/:id', deleteTodoHandler);

export default router;