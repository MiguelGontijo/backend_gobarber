import { startOfHour } from 'date-fns';

import appError from '@shared/errors/AppError';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from "../repositories/IAppointmentsRepository";
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
interface IRequest {
   provider_id: string;
   date: Date;
}

/* SOLID - Dependency Invertion Principle */
class CreateAppointmentService {
   constructor(private appointmentsReporitory: IAppointmentsRepository) { }

   public async execute({ date, provider_id }: IRequest): Promise<Appointment> {

      const appointmentDate = startOfHour(date);

      const findAppointmentInSameDate = await this.appointmentsReporitory.findByDate(appointmentDate);

      if (findAppointmentInSameDate) {
         throw new appError("This appointment is already booked", 400);
      }

      const appointment = await this.appointmentsReporitory.create({
         provider_id,
         date: appointmentDate,
      });

      return appointment;
   }
}

export default CreateAppointmentService;
