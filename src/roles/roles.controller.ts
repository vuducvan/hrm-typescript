import { Controller, Get, Param, Query } from '@nestjs/common';
import { RolesService } from './roles.service';
import { QueryParam } from '../const/queryParam';

@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  //get all role with pagging
  @Get('all')
  findAll(@Query() query: QueryParam) {
    return this.rolesService.findAll(query.currentPage, query.pageSize);
  }

  //get role by id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(id);
  }
}
