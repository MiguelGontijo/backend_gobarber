import { Router } from 'express';
import AuthenticateUserServices from '@modules/users/services/AuthenticateUserServices';

const sessionsRoutes = Router();

sessionsRoutes.post('/', async (request, response) => {
   const { email, password } = request.body;

   const authenticatedUser = new AuthenticateUserServices();

   const { user, token } = await authenticatedUser.execute({ email, password });

   return response.json({ user, token });
});

export default sessionsRoutes;
