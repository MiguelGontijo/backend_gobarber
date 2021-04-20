import {
   Entity,
   Column,
   PrimaryGeneratedColumn,
   CreateDateColumn,
   UpdateDateColumn,
   ManyToOne,
   JoinColumn
} from 'typeorm';
import User from '../../users/entities/Users';

@Entity('appointments')
class Appointment {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column()
   provider_id: string;

   @ManyToOne(() => User)
   @JoinColumn({ name: 'provider_id' })
   provider: User;

   @Column('timestamp with time zone')
   date: Date;

   @CreateDateColumn()
   created_at: Date;

   @UpdateDateColumn()
   updated_at: Date;

   /*
      o constructor não precisa mais ser chamado pela aplicação o typeorm
      faz todo o processo
      constructor({ provider, date }: Omit<Appointment,'id'> ) {
      this.id = uuid();
      this.provider = provider;
      this.date = date;
   } */
}

export default Appointment;
