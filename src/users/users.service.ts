import { Injectable, Inject } from '@nestjs/common';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: typeof User,
  ) {}

  //get all user with pagging
  async findAll(currentPage: string, pageSize: string): Promise<User[]> {
    const page = parseInt(currentPage);
    const size = parseInt(pageSize);
    return this.usersRepository.findAll({
      limit: size,
      offset: (page - 1) * size,
      where: {
        isDelete: 0,
      },
    });
  }

  //get user by id
  async findOne(id: string): Promise<User> {
    return this.usersRepository.findOne({
      where: {
        id,
        isDelete: 0,
      },
    });
  }
}
