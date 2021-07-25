import { Controller, Get, Param, Query } from '@nestjs/common';
import { FormsService } from './forms.service';
import { QueryParam } from '../const/queryParam';

@Controller('forms')
export class FormsController {
  constructor(private formsService: FormsService) {}

  //get all form with pagging
  @Get()
  findAll(@Query() query: QueryParam) {
    return this.formsService.findAll(query.currentPage, query.pageSize);
  }

  //get form by id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formsService.findOne(id);
  }
}
