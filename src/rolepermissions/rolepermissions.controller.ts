import { Controller, Get, Param, Query } from '@nestjs/common';
import { RolepermissionsService } from './rolepermissions.service';
import { QueryParam } from '../const/queryParam';

@Controller('rolepermissions')
export class RolepermissionsController {
  constructor(private rolepermissionsService: RolepermissionsService) {}

  //get all role-permission with pagging
  @Get()
  findAll(@Query() query: QueryParam) {
    return this.rolepermissionsService.findAll(
      query.currentPage,
      query.pageSize,
    );
  }

  //get role-permission by id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolepermissionsService.findOne(id);
  }
}
