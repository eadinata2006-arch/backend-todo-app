import { Request, Response } from "express";
import { 
  getTodosByUserId, 
  createTodo, 
  updateTodo, 
  deleteTodo, 
  getTodoById 
} from "../models/todoModel";

export const getTodos = async (req: Request, res: Response): Promise<void> => {
  const userId = res.locals.userId;
  try {
    const todos = await getTodosByUserId(userId);
    res.status(200).json({ success: true, data: todos });
  } catch (error) {
    res.status(500).json({ success: false, message: "Gagal mengambil data." });
  }
};

export const getTodoByIdHandler = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const userId = res.locals.userId;

  try {
    const todo = await getTodoById(Number(id), userId);

    if (!todo) {
      res.status(404).json({ success: false, message: "Tugas tidak ditemukan!" });
      return;
    }

    res.status(200).json({ success: true, data: todo });
  } catch (error) {
    res.status(500).json({ success: false, message: "Gagal mengambil data." });
  }
};

export const createTodoHandler = async (req: Request, res: Response): Promise<void> => {
  const { task } = req.body;
  const userId = res.locals.userId;

  try {
    const todoId = await createTodo(userId, task);
    res.status(201).json({ success: true, message: "Tugas berhasil ditambahkan!", id: todoId });
  } catch (error) {
    res.status(500).json({ success: false, message: "Gagal menambahkan tugas." });
  }
};

export const updateTodoHandler = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { task, is_completed } = req.body;
  const userId = res.locals.userId;

  try {
    const affectedRows = await updateTodo(Number(id), task, is_completed, userId);

    if (affectedRows === 0) {
      res.status(404).json({ success: false, message: "Tugas tidak ditemukan!" });
      return;
    }

    res.status(200).json({ success: true, message: "Tugas berhasil diperbarui!" });
  } catch (error) {
    console.error("ERROR UPDATE:", error);
    res.status(500).json({ success: false, message: "Gagal memperbarui tugas." });
  }
};

export const deleteTodoHandler = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const userId = res.locals.userId;

  try {
    const affectedRows = await deleteTodo(Number(id), userId);

    if (affectedRows === 0) {
      res.status(404).json({ success: false, message: "Tugas tidak ditemukan!" });
      return;
    }

    res.status(200).json({ success: true, message: "Tugas berhasil dihapus!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Gagal menghapus tugas." });
  }
};