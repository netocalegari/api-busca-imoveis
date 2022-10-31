import { Router } from "express";
import { createScheduleController, listSchedulesController } from "../controllers/schedules.controller";
import verifyAuthMiddleware from "../middlewares/verifyAuth.middleware";
import verifyIsAdmMiddleware from "../middlewares/verifyIsAdm.middleware";

const schedulesRouter = Router();

schedulesRouter.post('', verifyAuthMiddleware, createScheduleController);
schedulesRouter.get('/properties/:id', verifyAuthMiddleware, verifyIsAdmMiddleware, listSchedulesController);

export default schedulesRouter;