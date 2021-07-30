import { Injectable, Inject } from '@nestjs/common';
import { Account } from './accounts.entity';
import { CreateAccountDto } from './dto/createAccount.dto';
import { UpdateAccountDto } from './dto/updateAccount.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AccountsService {
  constructor(
    @Inject('ACCOUNTS_REPOSITORY')
    private accountsRepository: typeof Account,
  ) {}

  //get all account with pagging
  async findAll(currentPage: string, pageSize: string): Promise<Account[]> {
    const page = parseInt(currentPage);
    const size = parseInt(pageSize);
    return this.accountsRepository.findAll({
      limit: size,
      offset: (page - 1) * size,
      where: {
        isDelete: 0,
      },
    });
  }

  //get account by id
  async findOne(id: string): Promise<Account> {
    return this.accountsRepository.findOne({
      where: {
        id,
        isDelete: 0,
      },
    });
  }

  //get user by username
  async findOneAccount(username: string): Promise<Account | undefined> {
    return this.accountsRepository.findOne({
      where: {
        username,
        isDelete: 0,
      },
    });
  }

  //create new account
  async create(createAccountDto: CreateAccountDto): Promise<Account> {
    createAccountDto.isDelete = 0;
    const salt = await bcrypt.genSalt(10);
    createAccountDto.password = await bcrypt.hash(
      createAccountDto.password,
      salt,
    );
    return await this.accountsRepository.create<Account>(createAccountDto);
  }

  //delete account by update isDelete = 1
  async deleteAccount(id: string): Promise<any> {
    const Temp = await this.accountsRepository.findOne({
      where: {
        id,
        isDelete: 0,
      },
    });
    if (!Temp) {
      return {
        message: `Can not delete this accout`,
      };
    }
    Temp.isDelete = 1;
    await Temp.save();
    return {
      message: `Delete success`,
    };
  }

  //update account by id
  async update(updateAccountDto: UpdateAccountDto, id: string): Promise<any> {
    const condition = { where: { id: id, isDelete: 0 } };
    const salt = await bcrypt.genSalt(10);
    updateAccountDto.password = await bcrypt.hash(
      updateAccountDto.password,
      salt,
    );
    const Temp = await this.accountsRepository.findOne({
      where: {
        id,
        isDelete: 0,
      },
    });
    if (!Temp) {
      return {
        message: `Can not update this acocunt`,
      };
    }
    updateAccountDto.id = id;
    await this.accountsRepository.update(updateAccountDto, condition);
    return {
      message: `Update success`,
    };
  }
}
