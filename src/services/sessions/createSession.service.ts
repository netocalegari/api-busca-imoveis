import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { ISessionRequest } from "../../interfaces/session";
import { compare } from 'bcrypt';
import jwt from "jsonwebtoken";
import 'dotenv/config';
import { AppError } from "../../errors/appError";

const createSessionService = async ({email, password}: ISessionRequest): Promise<string> => {
  const  userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({
    email: email
  });

  if (!user) {
    throw new AppError(403, 'Invalid email/password');
  };

  const passwordMatch = await compare(password, user.password);

  if (!passwordMatch) {
    throw new AppError(403,'Invalid email/password');
  }

  const token = jwt.sign({
      isAdm: user.isAdm,
      isActive: user.isActive,
    },
    process.env.SECRET_KEY as string,
    {
      expiresIn: '24h',
      subject: user.id
    }
  );

  return token;
};

export default createSessionService;