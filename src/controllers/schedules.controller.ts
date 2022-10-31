import { Request, Response } from "express";
import { AppError, handleError } from "../errors/appError";
import createScheduleService from "../services/schedules/createSchedule.service";
import listSchedulesService from "../services/schedules/listSchedules.service";

const createScheduleController = async (req: Request, res: Response) => {
  try {
    const { date, hour, propertyId } = req.body;
    const userId = req.user.id;

    const createdSchedule = await createScheduleService({ userId, date, hour, propertyId});

    return res.status(201).json({message: 'Schedule created'});
  } catch(err) {
    if (err instanceof AppError) {
      handleError(err, res);
    };
  };
};

const listSchedulesController = async (req: Request, res: Response) => {
  const property_id = req.params.id;

  const schedulesProperty = await listSchedulesService(property_id);

  return res.status(200).json(schedulesProperty);
};

export { createScheduleController, listSchedulesController };