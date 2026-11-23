import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError.js";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Erros conhecidos da aplicação
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message
    });
  }

  // Erros desconhecidos
  console.error(err);

  return res.status(500).json({
    success: false,
    message: "Erro interno do servidor"
  });
}