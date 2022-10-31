import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUserRequest } from "../../interfaces/users";
import { hash } from 'bcrypt';
import { AppError } from "../../errors/appError";

const createUserService = async ({ name, email, isAdm, password }: IUserRequest): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);
  
  // if (!name || !email || !password) {
  //   throw new AppError(400, `${} is missing`);
  // };

  if (!email) {
    throw new AppError(400, 'Email is missing');
  };

  
  if (!password) {
    throw new AppError(400, 'Password is missing');
  };

  const emailAlreadyExists = await userRepository.findOneBy({
    email: email
  });

  if (emailAlreadyExists) {
    throw new AppError(400, 'Email is already registered');
  }

  const hashedPassword = await hash(password, 10);

  const user = new User();
  user.name = name; 
  user.email = email;
  user.isAdm = isAdm ? isAdm : false;
  user.password = hashedPassword;

  userRepository.create(user);
  await userRepository.save(user);

  return user;
};

export default createUserService;