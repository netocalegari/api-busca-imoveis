import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/appError";

const verifyIsAdmMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user.isAdm) {
    throw new AppError(403, 'User lacks admin privileges');
  };

  return next();
};

export default verifyIsAdmMiddleware;