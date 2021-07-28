import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { RolepermissionsService } from './rolepermissions.service';
import { QueryParam } from '../const/queryParam';
import { CreateRolePerDto } from './dto/createRolePer.dto';
import { UpdateRolePerDto } from './dto/updateRolePer.dto';

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

  //create new role-per
  @Post()
  create(@Body() body: CreateRolePerDto) {
    return this.rolepermissionsService.create(body);
  }

  //delete role-per by update isDelete = 1
  @Patch('/delete/:id')
  deleteRolePer(@Param('id') id: string) {
    return this.rolepermissionsService.deleteRolePer(id);
  }

  //update role-per by id
  @Patch('/update/:id')
  update(@Param('id') id: string, @Body() body: UpdateRolePerDto) {
    return this.rolepermissionsService.update(body, id);
  }
}
