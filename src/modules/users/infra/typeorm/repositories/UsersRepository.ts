import { getRepository, Repository } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '../entities/Users';

class UsersRepository
   implements IUsersRepository {
   private ormRepository: Repository<User>;

   constructor() {
      this.ormRepository = getRepository(User);
   }

   public async create(userData: ICreateUserDTO): Promise<User> {
      const user = this.ormRepository.create(userData);

      await this.ormRepository.save(userData);

      return user
   }

   public async findById(id: string): Promise<User | undefined> {
      const user = await this.ormRepository.findOne(id);
      return user;
   };

   public async findByEmail(email: string): Promise<User | undefined> {
      const user = await this.ormRepository.findOne({ where: { email } });
      return user;
   };

   /**
    * save
    */
   public save(user: ICreateUserDTO): Promise<User> {
      return this.ormRepository.save(user);
   }
}

export default UsersRepository;
