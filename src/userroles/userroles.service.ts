import { Injectable, Inject } from '@nestjs/common';
import { CreateUserroleDto } from './dto/createUserrole.dto';
import { UpdateUserroleDto } from './dto/updateUserrole.dto';
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

  //create new user-role
  async create(createUserroleDto: CreateUserroleDto): Promise<Userrole> {
    createUserroleDto.isDelete = 0;
    return await this.userrolesRepository.create(createUserroleDto);
  }

  //delete userrole by update isDelete = 1
  async deleteUserrole(id: string): Promise<any> {
    const Temp = await this.userrolesRepository.findOne({
      where: {
        id,
        isDelete: 0,
      },
    });
    if (!Temp) {
      return {
        message: `Can not delete this user-role`,
      };
    }
    Temp.isDelete = 1;
    await Temp.save();
    return {
      message: `Delete success`,
    };
  }

  //update userrole by id
  async update(updateUserroleDto: UpdateUserroleDto, id: string): Promise<any> {
    const condition = { where: { id: id, isDelete: 0 } };
    const Temp = await this.userrolesRepository.findOne({
      where: {
        id,
        isDelete: 0,
      },
    });
    if (!Temp) {
      return {
        message: `Can not update this user-role`,
      };
    }
    updateUserroleDto.id = id;
    await this.userrolesRepository.update(updateUserroleDto, condition);
    return {
      message: `Update success`,
    };
  }
}
