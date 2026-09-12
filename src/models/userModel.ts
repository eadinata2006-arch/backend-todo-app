import pool from "../config/db.js";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export interface User extends RowDataPacket {
  id: number;
  username: string;
  email: string;
  password: string;
}

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const [rows] = await pool.query<User[]>(
    "SELECT * FROM users WHERE email = ? LIMIT 1",
    [email]
  );
  return rows.length > 0 ? rows[0] : null;
};

export const createUser = async (
  username: string,
  email: string,
  hashedPassword: string
): Promise<number> => {
  const [result] = await pool.query<ResultSetHeader>(
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
    [username, email, hashedPassword]
  );
  return result.insertId;
};
