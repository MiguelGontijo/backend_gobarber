import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import Users from '../entities/Users';
import auth from "../../../config/auth";
import appError from '../../../shared/errors/AppError';

interface Request {
   email: string;
   password: string;
}

interface Response {
   user: Users;
   token: string;
}

class AuthenticateUserServices {
   public async execute({ email, password }: Request): Promise<Response> {
      const usersRepository = getRepository(Users);

      const user = await usersRepository.findOne({ where: { email } });

      if (!user) {
         throw new appError('email/password invalid', 401);
      }

      const validUser = await compare(password, user.password);

      if (!validUser) {
         throw new appError('email/password invalid', 401);
      }

      const { secret, expiresIn } = auth.JWT;

      const token = sign({}, secret, {
         subject: user.id,
         expiresIn: expiresIn,
      });

      return {
         user,
         token
      };
   }

}

export default AuthenticateUserServices;
