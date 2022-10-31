import AppDataSource from "../../data-source";
import { User } from '../../entities/user.entity';
import { IUserUpdate } from "../../interfaces/users";
import { hash } from "bcrypt";
import { AppError } from "../../errors/appError";

const updateUserService = async ({name, email, password}: IUserUpdate, id: string): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);

  const userToBeUpdated = await userRepository.findOneBy({
    id
  });

  if (!userToBeUpdated) {
    throw new AppError(404, 'User not found');
  };

  await userRepository.update(
    id,
    {
      name: name ? name : userToBeUpdated.name,
      email: email ? email : userToBeUpdated.email,
      password: password ? await hash(password, 10) : userToBeUpdated.password,
    }
  );

  const updatedUser = await userRepository.findOneBy({
    id
  });

  return updatedUser!;
};

export default updateUserService;