import { Router } from "express";
import { createPropertyController, listPropertiesController } from "../controllers/properties.controller";
import verifyAuthMiddleware from "../middlewares/verifyAuth.middleware";
import verifyIsAdmMiddleware from "../middlewares/verifyIsAdm.middleware";

const propertiesRouter = Router();

propertiesRouter.post('', verifyAuthMiddleware, verifyIsAdmMiddleware, createPropertyController);
propertiesRouter.get('', listPropertiesController);

export default propertiesRouter;