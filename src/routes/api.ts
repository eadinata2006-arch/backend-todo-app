import { Router } from "express";
import { register, login } from "../controllers/authController.js";
import { getTodos, addTodo } from "../controllers/todoController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  validateRegister,
  validateLogin,
  validateTodo,
} from "../middlewares/validator.js";

const router = Router();

// Auth routes
router.post("/auth/register", validateRegister, register);
router.post("/auth/login", validateLogin, login);

// Todo routes (dilindungi authMiddleware)
router.get("/todos", authMiddleware, getTodos);
router.post("/todos", authMiddleware, validateTodo, addTodo);

export default router;
