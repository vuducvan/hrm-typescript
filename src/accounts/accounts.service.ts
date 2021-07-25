import { Injectable, Inject } from '@nestjs/common';
import { Account } from './accounts.entity';

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
}
