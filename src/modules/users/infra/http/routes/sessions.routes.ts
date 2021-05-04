import { Router } from 'express';
import AuthenticateUserServices from '@modules/users/services/AuthenticateUserServices';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

const sessionsRoutes = Router();

sessionsRoutes.post('/', async (request, response) => {
   const { email, password } = request.body;

   const usersRepository = new UsersRepository();
   const authenticatedUser = new AuthenticateUserServices(usersRepository);

   const { user, token } = await authenticatedUser.execute({ email, password });

   return response.json({ user, token });
});

export default sessionsRoutes;
