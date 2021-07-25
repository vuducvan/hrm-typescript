import { Injectable, Inject } from '@nestjs/common';
import { Role } from './roles.entity';

@Injectable()
export class RolesService {
  constructor(
    @Inject('ROLES_REPOSITORY')
    private rolesRepository: typeof Role,
  ) {}

  //get all role with pagging
  async findAll(currentPage: string, pageSize: string): Promise<Role[]> {
    const page = parseInt(currentPage);
    const size = parseInt(pageSize);
    return this.rolesRepository.findAll({
      limit: size,
      offset: (page - 1) * size,
      where: {
        isDelete: 0,
      },
    });
  }

  //get role by id
  async findOne(id: string): Promise<Role> {
    return this.rolesRepository.findOne({
      where: {
        id,
        isDelete: 0,
      },
    });
  }
}
