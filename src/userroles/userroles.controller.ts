import { Controller, Get, Param, Query } from '@nestjs/common';
import { UserrolesService } from './userroles.service';
import { QueryParam } from '../const/queryParam';

@Controller('userroles')
export class UserrolesController {
  constructor(private userrolesService: UserrolesService) {}

  //get all user-role with pagging
  @Get()
  findAll(@Query() query: QueryParam) {
    return this.userrolesService.findAll(query.currentPage, query.pageSize);
  }

  //get user-role by id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userrolesService.findOne(id);
  }
}
