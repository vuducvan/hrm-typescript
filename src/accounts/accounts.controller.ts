import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { QueryParam } from '../const/queryParam';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateAccountDto } from './dto/createAccount.dto';
import { UpdateAccountDto } from './dto/updateAccount.dto';

@Controller('accounts')
export class AccountsController {
  constructor(private accountsService: AccountsService) {}

  //get all account with pagging
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query() query: QueryParam) {
    return this.accountsService.findAll(query.currentPage, query.pageSize);
  }

  //get account by id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountsService.findOne(id);
  }

  //create new account
  @Post()
  create(@Body() body: CreateAccountDto) {
    return this.accountsService.create(body);
  }

  //delete account by update isDelete = 1
  @Patch('/delete/:id')
  deleteRole(@Param('id') id: string) {
    return this.accountsService.deleteAccount(id);
  }

  //update account by id
  @Patch('/update/:id')
  update(@Param('id') id: string, @Body() body: UpdateAccountDto) {
    return this.accountsService.update(body, id);
  }
}
