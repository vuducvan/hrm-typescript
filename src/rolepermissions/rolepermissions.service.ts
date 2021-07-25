import { Injectable, Inject } from '@nestjs/common';
import { Rolepermission } from './rolepermissions.entity';

@Injectable()
export class RolepermissionsService {
  constructor(
    @Inject('ROLEPERMISSIONS_REPOSITORY')
    private rolepermissionsRepository: typeof Rolepermission,
  ) {}

  //get all role-permission with pagging
  async findAll(
    currentPage: string,
    pageSize: string,
  ): Promise<Rolepermission[]> {
    const page = parseInt(currentPage);
    const size = parseInt(pageSize);
    return this.rolepermissionsRepository.findAll({
      limit: size,
      offset: (page - 1) * size,
      where: {
        isDelete: 0,
      },
    });
  }

  //get role-permission by id
  async findOne(id: string): Promise<Rolepermission> {
    return this.rolepermissionsRepository.findOne({
      where: {
        id,
        isDelete: 0,
      },
    });
  }
}
