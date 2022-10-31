import { Request, Response } from "express";
import { AppError, handleError } from "../errors/appError";
import { instanceToPlain } from 'class-transformer';
import { IUserUpdate } from "../interfaces/users";
import createUserService from '../services/users/createUser.service';
import listUsersService from "../services/users/listUsers.service";
import updateUserService from "../services/users/updateUser.service";
import deleteUserService from "../services/users/deleteUser.service";

const createUserController = async (req: Request, res: Response) => {
  try {
    const { name, email, isAdm, password } = req.body;

    const createdUser = await createUserService({ name, email, isAdm, password });

    return res.status(201).json(instanceToPlain(createdUser));
  } catch(err) {
    if (err instanceof AppError) {
      handleError(err, res);
    };
  };
};

const listUsersController = async (req: Request, res: Response) => {
    const users = await listUsersService();

    return res.status(200).json(instanceToPlain(users));
};

const updateUserController = async (req: Request, res: Response) => {
  try {
    const user: IUserUpdate = req.body;
    const { id } = req.params;
    const loggedUser = req.user;

    if (loggedUser.id !== id && !loggedUser.isAdm) {
      return res.status(401).json({message: 'User lack admin privileges'});
    };

    const updatedUser = await updateUserService(user, id);
    
    return res.status(200).json(updatedUser);
  } catch(err) {
    if (err instanceof AppError) {
      handleError(err, res);
    };
  };
};

const deleteUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleteUser = await deleteUserService(id);

    return res.status(204).send();
  } catch(err) {
    if (err instanceof AppError) {
      handleError(err, res);
    };
  };
};

export { createUserController, listUsersController, updateUserController, deleteUserController };