import { Controller, Get, Param, Query } from '@nestjs/common';
import { ScreensService } from './screens.service';
import { QueryParam } from '../const/queryParam';

@Controller('screens')
export class ScreensController {
  constructor(private screensService: ScreensService) {}

  //get all screen with pagging
  @Get('')
  findAll(@Query() query: QueryParam) {
    return this.screensService.findAll(query.currentPage, query.pageSize);
  }

  //get screen by id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.screensService.findOne(id);
  }
}
