import AppDataSource from "../../data-source";
import { Property } from "../../entities/properties.entity";
import { Schedule } from "../../entities/schedules.entity";
import { AppError } from "../../errors/appError";

const listSchedulesService = async (property_id: string) => {
  // const scheduleRepository = AppDataSource.getRepository(Schedule);
  const propertyRepository = AppDataSource.getRepository(Property);

  const property = await propertyRepository.findOne({
    where: {
      id: property_id
    },
    relations: {
      schedules: true
    }
  });

  if (!property) {
    throw new AppError(404, 'Property not found');
  };
  
  return property;
};

export default listSchedulesService;