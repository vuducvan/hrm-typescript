import { Injectable, Inject } from '@nestjs/common';
import { CreateRolePerDto } from './dto/createRolePer.dto';
import { UpdateRolePerDto } from './dto/updateRolePer.dto';
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

  //create new role-per
  async create(createRolePerDto: CreateRolePerDto): Promise<Rolepermission> {
    createRolePerDto.isDelete = 0;
    return await this.rolepermissionsRepository.create<Rolepermission>(
      createRolePerDto,
    );
  }

  //delete role-per by update isDelete = 1
  async deleteRolePer(id: string): Promise<any> {
    const Temp = await this.rolepermissionsRepository.findOne({
      where: {
        id,
        isDelete: 0,
      },
    });
    if (!Temp) {
      return {
        message: `Can not delete this role-permission`,
      };
    }
    Temp.isDelete = 1;
    await Temp.save();
    return {
      message: `Delete success`,
    };
  }

  //update role-per by id
  async update(updateRolePerDto: UpdateRolePerDto, id: string): Promise<any> {
    const condition = { where: { id: id, isDelete: 0 } };
    const Temp = await this.rolepermissionsRepository.findOne({
      where: {
        id,
        isDelete: 0,
      },
    });
    if (!Temp) {
      return {
        message: `Can not update this role-permission`,
      };
    }
    updateRolePerDto.id = id;
    await this.rolepermissionsRepository.update(updateRolePerDto, condition);
    return {
      message: `Update success`,
    };
  }
}
