import { Request, Response } from "express";
import { AppError, handleError } from "../errors/appError";
import { ISessionRequest } from "../interfaces/session";
import createSessionService from "../services/sessions/createSession.service";

const createSessionController = async (req: Request, res: Response) => {
  try {
    const data: ISessionRequest = req.body;
    const token = await createSessionService(data);

    return res.json({token});
  } catch(err) {
    if (err instanceof AppError) {
      handleError(err, res);
    };
  };
};

export { createSessionController };