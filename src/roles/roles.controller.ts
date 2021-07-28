import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { QueryParam } from '../const/queryParam';
import { CreateRoleDto } from './dto/createRole.dto';
import { UpdateRoleDto } from './dto/updateRole.dto';

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

  //create new role
  @Post()
  create(@Body() body: CreateRoleDto) {
    return this.rolesService.create(body);
  }

  //delete role by update isDelete = 1
  @Patch('/delete/:id')
  deleteRole(@Param('id') id: string) {
    return this.rolesService.deleteRole(id);
  }

  //update role by id
  @Patch('/update/:id')
  update(@Param('id') id: string, @Body() body: UpdateRoleDto) {
    return this.rolesService.update(body, id);
  }
}
