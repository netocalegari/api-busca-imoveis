import { ICategoryRequest } from "../../interfaces/categories";
import { Category } from "../../entities/category.entity";
import AppDataSource from "../../data-source";
import { AppError } from "../../errors/appError";

const createCategoryService = async ({name}: ICategoryRequest): Promise<Category> => {
  const categoryRepository = AppDataSource.getRepository(Category);

  if (!name) {
    throw new AppError(400, 'Name is missing');
  };

  const nameAlreadyExists = await categoryRepository.findOneBy({
    name: name
  });

  if (nameAlreadyExists) {
    throw new AppError(400, 'Name is already registered');
  };

  const newCategory = new Category();
  newCategory.name = name;

  categoryRepository.create(newCategory);
  await categoryRepository.save(newCategory);

  return newCategory;
};

export default createCategoryService;