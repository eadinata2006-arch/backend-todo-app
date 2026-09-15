import { Request, Response, NextFunction } from "express";

export const validateRegister = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400).json({
      success: false,
      message: "Username, email, dan password wajib diisi",
    });
    return;
  }

  next();
};

export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      success: false,
      message: "Email dan password wajib diisi",
    });
    return;
  }

  next();
};

export const validateTodo = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { task } = req.body;

  if (!task || task.trim() === "") {
    res.status(400).json({
      success: false,
      message: "Task wajib diisi",
    });
    return;
  }

  next();
};

// Validasi tambahan untuk update todo (Langkah 3)
export const validateUpdateTodo = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { task, is_done } = req.body;

  // Minimal salah satu harus dikirim
  if (task === undefined && is_done === undefined) {
    res.status(400).json({
      success: false,
      message: "Isi minimal task atau is_done!",
    });
    return;
  }

  // Jika task dikirim, harus berupa string
  if (task !== undefined && typeof task !== "string") {
    res.status(400).json({
      success: false,
      message: "Task harus berupa string!",
    });
    return;
  }

  // Jika is_done dikirim, harus berupa boolean
  if (is_done !== undefined && typeof is_done !== "boolean") {
    res.status(400).json({
      success: false,
      message: "is_done harus berupa true atau false!",
    });
    return;
  }

  next();
};
