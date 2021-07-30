import { Injectable, Inject } from '@nestjs/common';
import { CreateRoleDto } from './dto/createRole.dto';
import { UpdateRoleDto } from './dto/updateRole.dto';
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

  //create new role
  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    createRoleDto.isDelete = 0;
    return await this.rolesRepository.create<Role>(createRoleDto);
  }

  //delete role by update isDelete = 1
  async deleteRole(id: string): Promise<any> {
    const Temp = await this.rolesRepository.findOne({
      where: {
        id,
        isDelete: 0,
      },
    });
    if (!Temp) {
      return {
        message: `Can not delete this role`,
      };
    }
    Temp.isDelete = 1;
    await Temp.save();
    return {
      message: `Delete success`,
    };
  }

  //update role by id
  async update(updateRoleDto: UpdateRoleDto, id: string): Promise<any> {
    const condition = { where: { id: id, isDelete: 0 } };
    const Temp = await this.rolesRepository.findOne({
      where: {
        id,
        isDelete: 0,
      },
    });
    if (!Temp) {
      return {
        message: `Can not update this role`,
      };
    }
    updateRoleDto.id = id;
    await this.rolesRepository.update(updateRoleDto, condition);
    return {
      message: `Update success`,
    };
  }
}
