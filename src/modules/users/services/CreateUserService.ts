import { hash } from 'bcryptjs';
import appError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository'

import User from '../infra/typeorm/entities/Users';

interface IRequest {
   name: string;
   email: string;
   password: string;
}

class CreateUserService {
   constructor(private usersRepository: IUsersRepository) { }

   public async execute({ name, email, password }: IRequest): Promise<User> {

      const findByEmail = await this.usersRepository.findByEmail(email);

      if (findByEmail) {
         throw new appError('Email already used.', 400);
      }

      const hashedPassword = await hash(password, 8);

      const user = await this.usersRepository.create({
         name,
         email,
         password: hashedPassword,
      });

      return user;
   }
}

export default CreateUserService;
