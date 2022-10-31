import AppDataSource from "../../data-source";
import { Address } from "../../entities/addresses.entity";
import { Category } from "../../entities/category.entity";
import { Property } from "../../entities/properties.entity";
import { AppError } from "../../errors/appError";
import { IProperty, IPropertyRequest } from "../../interfaces/properties";

const createPropertyService = async ({ value, size, address, categoryId }: IPropertyRequest): Promise<Property> => {
  const propertyRepository = AppDataSource.getRepository(Property);
  const categoryRepository = AppDataSource.getRepository(Category);
  const addressRepository = AppDataSource.getRepository(Address);

  if (!value) {
    throw new AppError(404, 'Value is missing');
  };

  if (!size) {
    throw new AppError(404, 'Size is missing');
  };

  if (!address) {
    throw new AppError(404, 'Address is missing');
  };

  if (!categoryId) {
    throw new AppError(404, 'CategoryId is missing');
  };

  const categoryObj = await categoryRepository.findOneBy({
    id: categoryId
  });

  if (!categoryObj) {
    throw new AppError(404, 'Category not found');
  };

  const addressObj = await addressRepository.findOneBy({
    city: address.city,
    district: address.district,
    state: address.state,
    number: address.number
  });

  if (addressObj) {
    throw new AppError(400, 'Address already registered');
  };
  
  if (address.state.length > 2 || address.zipCode.length > 8) {
    throw new AppError(400, 'Value exceeds allowed length');
  }

  if (!addressObj) {
    addressRepository.create(address);
    await addressRepository.save(address);
  };

  const newAddress = await addressRepository.findOneBy({
    city: address.city,
    district: address.district,
    state: address.state,
    number: address.number
  });

  const property = new Property();
  property.value = value;
  property.size = size;
  property.category = categoryObj;
  property.address = newAddress!;

  propertyRepository.create(property);
  await propertyRepository.save(property);

  return property;
};

export default createPropertyService;