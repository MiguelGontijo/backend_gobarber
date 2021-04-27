import { getCustomRepository } from 'typeorm';
import { startOfHour } from 'date-fns';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentRepository';
import appError from '@shared/errors/AppError';

/*
* Services não pode ter acesso as variáveis request e response das rotas
* Deve receber os dados, assim como a trativa de erros no service a serem
* pegos na rota. E o mais importante que é o acesso ao repositório
* instanciado no arquivo de rotas
*
* Recebimento da informações
* Tratativa de erros/execessóes
* acesso ao repositório
 */
interface Request {
   provider_id: string;
   date: Date;
}

/* SOLID - Dependency Invertion Principle */
class CreateAppointmentService {
   public async execute({ date, provider_id }: Request): Promise<Appointment> {
      const appointmentsReporitory = getCustomRepository(AppointmentsRepository);

      const appointmentDate = startOfHour(date);

      const findAppointmentInSameDate = await appointmentsReporitory.findByDate(appointmentDate);

      if (findAppointmentInSameDate) {
         throw new appError("This appointment is already booked", 400);
      }

      const appointment = appointmentsReporitory.create({
         provider_id,
         date: appointmentDate,
      });

      await appointmentsReporitory.save(appointment);

      return appointment;
   }
}

export default CreateAppointmentService;
