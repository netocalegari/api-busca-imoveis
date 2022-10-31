import { Request, Response } from "express";
import { AppError, handleError } from "../errors/appError";
import createPropertyService from "../services/properties/createProperty.service";
import listPropertiesService from "../services/properties/listProperties.service";

const createPropertyController = async (req: Request, res: Response) => {
  try {
    const { value, size, address, categoryId } = req.body;

    const newProperty = await createPropertyService({ value, size, address, categoryId });

    return res.status(201).json(newProperty);
  } catch(err) {
    if (err instanceof AppError) {
      handleError(err, res);
    };
  };
};

const listPropertiesController = async (req: Request, res: Response) => {
  const properties = await listPropertiesService();

  return res.status(200).json(properties);
};

export { createPropertyController, listPropertiesController };