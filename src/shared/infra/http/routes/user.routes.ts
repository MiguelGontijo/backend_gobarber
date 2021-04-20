import { Router } from 'express';
import multer from "multer";
import uploadConfig from "../../config/upload";

import CreateUserService from '../../modules/users/services/CreateUserService';
import UpdateUsersAvatarService from '../../modules/users/services/UpdateUsersAvatarService';
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const usersRoutes = Router();
const upload = multer(uploadConfig);

usersRoutes.post('/', async (request, response) => {
   const { name, email, password } = request.body;
   console.log('chegou');
   const createUser = new CreateUserService();

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
      const updateUserAvatar = new UpdateUsersAvatarService();

      const user = await updateUserAvatar.execute({
         userid: request.user.id,
         avatarFileName: request.file.filename,
      })

      return response.json(user);

   });

export default usersRoutes;
