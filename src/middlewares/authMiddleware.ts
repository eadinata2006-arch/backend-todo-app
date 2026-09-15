import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthTokenPayload {
  userId: number;
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ 
      success: false,
      message: "Token tidak ditemukan" });
    return;
  }

  const token = authHeader.slice("Bearer ".length).trim();
  const jwtSecret = process.env.JWT_SECRET;

  if (!token || !jwtSecret) {
    res.status(401).json({
      success: false,
      message: !token ? "Token tidak ditemukan" : "JWT_SECRET belum dikonfigurasi",
    });
    return;
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);

    if (
      typeof decoded === "string" ||
      typeof decoded.userId !== "number"
    ) {
      res.status(401).json({
        success: false,
        message: "Token tidak valid atau kadaluarsa",
      });
      return;
    }

    res.locals.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token tidak valid atau kadaluarsa" });
  }
};