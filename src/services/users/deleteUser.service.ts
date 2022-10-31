import AppDataSource from "../../data-source";
import { User } from '../../entities/user.entity';

const deleteUserService = async (id: string): Promise<void> => {
  const userRepository = AppDataSource.getRepository(User);

  const userToBeDeleted = await userRepository.findOneBy({
    id
  });

  if (!userToBeDeleted) {
    throw new Error('User not found');
  };

  await userRepository.update(
    id,
    {
      isActive: false
    }
  );
};

export default deleteUserService;