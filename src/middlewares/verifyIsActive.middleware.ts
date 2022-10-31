import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";
import { AppError } from "../errors/appError";


const verifyIsActiveMiddleware =  async (req: Request, res: Response, next: NextFunction) => {
  const {id} = req.params;

  const userRepository = AppDataSource.getRepository(User);

  const userToBeDeleted = await userRepository.findOneBy({
    id
  });

  if (!userToBeDeleted) {
    throw new AppError(404, 'User not found');
  };

  if (req.user.isActive === false) {
    throw new AppError(400, 'User is already inactive');
  };

  if (!userToBeDeleted?.isActive) {
    throw new AppError(400, 'User is already inactive');
  };

  return next();
};

export default verifyIsActiveMiddleware;