import { Controller, Get, Param, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { QueryParam } from '../const/queryParam';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  //get all user with pagging
  @Get()
  findAll(@Query() query: QueryParam) {
    return this.usersService.findAll(query.currentPage, query.pageSize);
  }

  //get user by id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
}
