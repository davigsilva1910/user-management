import { AppError } from "./AppError.js";

export class DatabaseError extends AppError {
  constructor(
    message = "Falha na persistência",
    cause?: unknown
  ) {
    super(message, 500, true, {cause});
  }
}