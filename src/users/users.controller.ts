import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { QueryParam } from '../const/queryParam';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateUserDto } from './dto/createUser.dto';
import { Express } from 'express';
import { multerOptions } from '../config/multer.config';
import { UpdateUserDto } from './dto/updateUser.dto';

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

  //create new user
  @UseInterceptors(FileInterceptor('avatar', multerOptions))
  @Post()
  uploadFile(
    @Body() body: CreateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    body.avatar = file.originalname;
    return this.usersService.create(body);
  }

  //delete user by update isDelete = 1
  @Patch('/delete/:id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }

  //update user by id
  @UseInterceptors(FileInterceptor('avatar', multerOptions))
  @Patch('/update/:id')
  update(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    body.avatar = file.originalname;
    return this.usersService.update(body, id);
  }
}
