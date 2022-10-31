import AppDataSource from "../../data-source";
import { Category } from "../../entities/category.entity";
import { AppError } from "../../errors/appError";
// import { Property } from "../../entities/properties.entity";

const listCategoryPropertiesService = async (category_id: string) => {
  const categoryRepository = AppDataSource.getRepository(Category);
  // const propertyRepository = AppDataSource.getRepository(Property);

  const categoryProperties = await categoryRepository.findOne({
   where: {
    id: category_id
   },
   relations: {
    properties: true
   }
  });

  if (!categoryProperties) {
    throw new AppError(404, 'Category not found');
  };

  return categoryProperties;
};

export default listCategoryPropertiesService;