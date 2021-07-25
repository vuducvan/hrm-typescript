import { Injectable, Inject } from '@nestjs/common';
import { Userrole } from './userroles.entity';

@Injectable()
export class UserrolesService {
  constructor(
    @Inject('USERROLES_REPOSITORY')
    private userrolesRepository: typeof Userrole,
  ) {}

  //get all user-role with pagging
  async findAll(currentPage: string, pageSize: string): Promise<Userrole[]> {
    const page = parseInt(currentPage);
    const size = parseInt(pageSize);
    return this.userrolesRepository.findAll({
      limit: size,
      offset: (page - 1) * size,
      where: {
        isDelete: 0,
      },
    });
  }

  //get user-role by id
  async findOne(id: string): Promise<Userrole> {
    return this.userrolesRepository.findOne({
      where: {
        id,
        isDelete: 0,
      },
    });
  }
}
