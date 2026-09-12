import pool from "../config/db.js";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export interface Todo extends RowDataPacket {
  id: number;
  user_id: number;
  task: string;
  is_done: boolean;
  created_at: string;
}

export const getTodosByUserId = async (userId: number): Promise<Todo[]> => {
  const [rows] = await pool.query<Todo[]>(
    "SELECT * FROM todos WHERE user_id = ? ORDER BY created_at DESC",
    [userId]
  );
  return rows;
};

export const createTodo = async (
  userId: number,
  task: string
): Promise<number> => {
  const [result] = await pool.query<ResultSetHeader>(
    "INSERT INTO todos (user_id, task) VALUES (?, ?)",
    [userId, task]
  );
  return result.insertId;
};
