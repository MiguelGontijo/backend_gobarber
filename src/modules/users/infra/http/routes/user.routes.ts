import { Router } from 'express';
import multer from "multer";
import uploadConfig from "@config/upload";

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository'
import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUsersAvatarService from '@modules/users/services/UpdateUsersAvatarService';
import ensureAuthenticated from "@shared/infra/http/middlewares/ensureAuthenticated";

const usersRoutes = Router();
const upload = multer(uploadConfig);

usersRoutes.post('/', async (request, response) => {
   const { name, email, password } = request.body;
   const usersRepository = new UsersRepository();
   const createUser = new CreateUserService(usersRepository);

   const user = await createUser.execute({
      name,
      email,
      password,
   });

   const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
   };

   return response.json(userWithoutPassword);
});

usersRoutes.patch('/avatar', ensureAuthenticated, upload.single('avatar'),
   async (request, response) => {
      const usersRepository = new UsersRepository();
      const updateUserAvatar = new UpdateUsersAvatarService(usersRepository);

      const user = await updateUserAvatar.execute({
         userid: request.user.id,
         avatarFileName: request.file.filename,
      })

      return response.json(user);

   });

export default usersRoutes;
