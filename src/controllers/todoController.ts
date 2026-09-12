import { Request, Response } from "express";
import { getTodosByUserId, createTodo } from "../models/todoModel.js";

export const getTodos = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.userId;
    const todos = await getTodosByUserId(userId);

    return res.status(200).json({
      message: "Berhasil mengambil data todo",
      data: todos,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
};

export const addTodo = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.userId;
    const { task } = req.body;

    const todoId = await createTodo(userId, task);

    return res.status(201).json({
      message: "Todo berhasil ditambahkan",
      todoId,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
};
