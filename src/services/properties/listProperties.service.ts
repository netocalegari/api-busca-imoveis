import AppDataSource from "../../data-source";
import { Property } from "../../entities/properties.entity";

const listPropertiesService = async () => {
  const propertyRepository = AppDataSource.getRepository(Property);

  const properties = await propertyRepository.find();

  return properties;
};

export default listPropertiesService;