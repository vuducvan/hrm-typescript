import { Injectable, Inject } from '@nestjs/common';
import { User } from './users.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
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

  //create new user
  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.usersRepository.create<User>(createUserDto);
  }

  //detele user by update isDelete = 1
  async deleteUser(id: string): Promise<any> {
    let check = false;
    const userTemp = await this.usersRepository.findOne({
      where: {
        id,
        isDelete: 0,
      },
    });
    if (userTemp) {
      userTemp.isDelete = 1;
    }
    if (!check && (await userTemp.save())) {
      check = true;
    }

    if (!check) {
      return {
        message: `Can not delete this user`,
      };
    }
    return {
      message: `Delete success`,
    };
  }

  //update user by id
  async update(updateUserDto: UpdateUserDto, id: string): Promise<any> {
    const condition = { where: { id: id, isDelete: 0 } };
    const userTemp: User = await this.usersRepository.findOne({
      where: {
        id,
        isDelete: 0,
      },
    });
    updateUserDto.id = id;
    if (userTemp) {
      const userUpdate = await this.usersRepository.update(
        updateUserDto,
        condition,
      );
      if (!userUpdate[0]) {
        return {
          message: `Can not update this user`,
        };
      }
      return {
        message: `Update success`,
      };
    }
    return {
      message: `Can not update this user`,
    };
  }
}
