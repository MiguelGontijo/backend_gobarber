import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../infra/typeorm/entities/Users';
import appError from '@shared/errors/AppError';

interface Request {
   name: string;
   email: string;
   password: string;
}

class CreateUserService {
   public async execute({ name, email, password }: Request): Promise<User> {
      const usersRepository = getRepository(User);

      const findByEmail = await usersRepository.findOne({
         where: { email },
      });

      if (findByEmail) {
         throw new appError('Email already used.', 400);
      }

      const hashedPassword = await hash(password, 8);

      const user = usersRepository.create({
         name,
         email,
         password: hashedPassword,
      });

      await usersRepository.save(user);

      return user;
   }
}

export default CreateUserService;
