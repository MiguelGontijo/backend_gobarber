import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import { parseISO } from 'date-fns';
import AppointmentsRepository from '../../modules/appointments/repositories/AppointmentRepository';
import CreateAppointmentService from '../../modules/appointments/services/CreateAppointmentService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (request, response) => {
   const appointmentsReporitory = getCustomRepository(AppointmentsRepository);
   const appointments = await appointmentsReporitory.find();

   return response.status(200).json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
   const { provider_id, date } = request.body;

   const parseDate = parseISO(date);

   const createAppointment = new CreateAppointmentService();

   const appointment = await createAppointment.execute({ date: parseDate, provider_id })

   return response.json(appointment);
});

export default appointmentsRouter;
