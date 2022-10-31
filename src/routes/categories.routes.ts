import { Router } from "express";
import { createCategoryController, listCategoriesController, listCategoryPropertiesController } from "../controllers/categories.controller";
import verifyAuthMiddleware from "../middlewares/verifyAuth.middleware";
import verifyIsAdmMiddleware from "../middlewares/verifyIsAdm.middleware";

const categoriesRouter = Router();

categoriesRouter.post('', verifyAuthMiddleware, verifyIsAdmMiddleware, createCategoryController);
categoriesRouter.get('', listCategoriesController);
categoriesRouter.get('/:id/properties', listCategoryPropertiesController);

export default categoriesRouter;