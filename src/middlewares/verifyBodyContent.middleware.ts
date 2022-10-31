import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/appError";

const verifyBodyContentMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const bodyContent = Object.keys(req.body);
  if (bodyContent.includes('isAdm') || bodyContent.includes('isActive') || bodyContent.includes('id')) {
    throw new AppError(401, 'You canot update this property')
  };

  return next();
};

export default verifyBodyContentMiddleware;