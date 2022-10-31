import { Request, Response } from "express";
import { AppError, handleError } from "../errors/appError";
import createCategoryService from "../services/categories/createCategory.service";
import listCategoriesService from "../services/categories/listCategories.service";
import listCategoryPropertiesService from "../services/categories/listCategoryProperties.service";

const createCategoryController = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const createdCategory = await createCategoryService({name});

    return res.status(201).json(createdCategory);
  } catch(err) {
    if (err instanceof AppError) {
      handleError(err, res);
    };
  };
};

const listCategoriesController = async (req: Request, res: Response) => {
  const categories = await listCategoriesService();

  return res.status(200).json(categories);
};

const listCategoryPropertiesController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const categoryProperties = await listCategoryPropertiesService(id);
  
  return res.status(200).json(categoryProperties);
};

export { createCategoryController, listCategoriesController, listCategoryPropertiesController };