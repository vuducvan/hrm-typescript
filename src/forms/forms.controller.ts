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
import { FormsService } from './forms.service';
import { QueryParam } from '../const/queryParam';
import { CreateFromDto } from './dto/createFrom.dto';
import { UpdateFromDto } from './dto/updateForm.dto';
import { SubmitFormDto } from './dto/submitForm.dto';
import { ApproveFormDto } from './dto/approveForm.dto';
import { CloseFormDto } from './dto/closeForm.dto';
import { ReportFormDto } from './dto/reportFrom.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('forms')
export class FormsController {
  constructor(private formsService: FormsService) {}

  //get all form with pagging
  @UseGuards(JwtAuthGuard)
  @Get('/all')
  findAll(@Query() query: QueryParam) {
    return this.formsService.findAll(query.currentPage, query.pageSize);
  }

  //get form by id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formsService.findOne(id);
  }

  //create new forms
  @Post()
  create(@Body() body: CreateFromDto) {
    return this.formsService.create(body);
  }

  //delete form by update isDelete = 1;
  @Patch('/delete/:id')
  deleteForm(@Param('id') id: string) {
    return this.formsService.deleteFrom(id);
  }

  //update form by id
  @Patch('/update/:id')
  update(@Param('id') id: string, @Body() body: UpdateFromDto) {
    return this.formsService.update(body, id);
  }

  //submit form
  @Patch('/submit/:id')
  submitForm(@Param('id') id: string, @Body() body: SubmitFormDto) {
    return this.formsService.submit(body, id);
  }

  //approve form
  @Patch('/approve/:id')
  approveForm(@Param('id') id: string, @Body() body: ApproveFormDto) {
    return this.formsService.approve(body, id);
  }

  //close form
  @Patch('/close/:id')
  closeForm(@Param('id') id: string, @Body() body: CloseFormDto) {
    return this.formsService.close(body, id);
  }

  //get report about form
  @Get()
  getReport(@Body() body: ReportFormDto) {
    return this.formsService.getReport(body);
  }
}
