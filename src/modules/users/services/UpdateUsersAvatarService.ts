import { getRepository } from "typeorm";
import path from 'path';
import fs from 'fs';

import Users from '../infra/typeorm/entities/Users';
import uploadConfig from '@config/upload';
import appError from '@shared/errors/AppError';

interface RequestDTO {
   userid: string;
   avatarFileName: string;
}

class UpdateUsersAvatarService {
   public async execute({ userid, avatarFileName }: RequestDTO): Promise<Users> {
      const userRepository = getRepository(Users);

      const user = await userRepository.findOne(userid);

      if (!user) {
         throw new appError('Only authenticated users can change avatar.', 401);
      }

      if (user.avatar) {
         const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
         const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

         if (userAvatarFileExists) {
            await fs.promises.unlink(userAvatarFilePath);
         }
      }

      user.avatar = avatarFileName;

      await userRepository.save(user);

      return user;
   }
}

export default UpdateUsersAvatarService;
