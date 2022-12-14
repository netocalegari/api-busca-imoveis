import { Response } from "express";

export class AppError extends Error {
  statusCode: number;

  constructor(statusCode: number = 400, message: string) {
    super()
    this.statusCode = statusCode;
    this.message = message
  };
};

export const handleError = (err: AppError, res: Response) => {
  const { statusCode, message } = err;

  return res.status(statusCode).json({
    statusCode,
    message
  })
};