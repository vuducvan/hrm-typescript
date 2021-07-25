import { Controller, Get, Param, Query } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { QueryParam } from '../const/queryParam';

@Controller('accounts')
export class AccountsController {
  constructor(private accountsService: AccountsService) {}

  //get all account with pagging
  @Get()
  findAll(@Query() query: QueryParam) {
    return this.accountsService.findAll(query.currentPage, query.pageSize);
  }

  //get account by id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountsService.findOne(id);
  }
}
