import { Injectable, Inject } from '@nestjs/common';
import { FORM_STATUS } from '../const/formStatus.enum';
import { CreateFromDto } from './dto/createFrom.dto';
import { Form } from './forms.entity';
import { UpdateFromDto } from './dto/updateForm.dto';
import { SubmitFormDto } from './dto/submitForm.dto';
import { ApproveFormDto } from './dto/approveForm.dto';
import { CloseFormDto } from './dto/closeForm.dto';
import { ReportFormDto } from './dto/reportFrom.dto';

@Injectable()
export class FormsService {
  constructor(
    @Inject('FORMS_REPOSITORY')
    private formsRepository: typeof Form,
  ) {}

  //get all form with pagging
  async findAll(currentPage: string, pageSize: string): Promise<Form[]> {
    try {
      const page = parseInt(currentPage);
      const size = parseInt(pageSize);
      return this.formsRepository.findAll({
        limit: size,
        offset: (page - 1) * size,
        where: {
          isDelete: 0,
        },
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  //get form by id
  async findOne(id: string): Promise<Form> {
    try {
      return this.formsRepository.findOne({
        where: {
          id,
          isDelete: 0,
        },
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  //create new form
  async create(createFormDto: CreateFromDto): Promise<any> {
    try {
      createFormDto.isDelete = 0;
      createFormDto.status = FORM_STATUS.NEW;
      const userIdArray = createFormDto.userId;
      createFormDto.userId = {};
      // const listEmail: string[] = [];
      for (const x in userIdArray) {
        createFormDto.userId = userIdArray[x];
        await this.formsRepository.create(createFormDto);
      }
      return {
        message: `Create success`,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  //delete form by update isDelete = 1
  async deleteFrom(id: string): Promise<any> {
    try {
      const Temp = await this.formsRepository.findOne({
        where: {
          id,
          isDelete: 0,
        },
      });
      if (!Temp) {
        return {
          message: `Can not delete this role`,
        };
      }
      Temp.isDelete = 1;
      await Temp.save();
      return {
        message: `Delete success`,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  //update form by id
  async update(updateFromDto: UpdateFromDto, id: string): Promise<any> {
    try {
      const condition = { where: { id: id, isDelete: 0 } };
      const Temp = await this.formsRepository.findOne({
        where: {
          id,
          isDelete: 0,
        },
      });
      if (!Temp) {
        return {
          message: `Can not update this role`,
        };
      }
      updateFromDto.id = id;
      await this.formsRepository.update(updateFromDto, condition);
      return {
        message: `Update success`,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  //submit form
  async submit(updateFromDto: SubmitFormDto, id: string): Promise<any> {
    try {
      const condition = { where: { id: id, isDelete: 0 } };
      const Temp = await this.formsRepository.findOne({
        where: {
          id,
          isDelete: 0,
        },
      });
      if (!Temp) {
        return {
          message: `Can not submit this form`,
        };
      }
      updateFromDto.id = id;
      updateFromDto.status = FORM_STATUS.PENDING_APPROVE;
      await this.formsRepository.update(updateFromDto, condition);
      return {
        message: `Submit success`,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  //approve form
  async approve(updateFromDto: ApproveFormDto, id: string): Promise<any> {
    try {
      const condition = { where: { id: id, isDelete: 0 } };
      const Temp = await this.formsRepository.findOne({
        where: {
          id,
          isDelete: 0,
        },
      });
      if (!Temp) {
        return {
          message: `Can not approve this form`,
        };
      }
      updateFromDto.id = id;
      updateFromDto.status = FORM_STATUS.APPROVED;
      await this.formsRepository.update(updateFromDto, condition);
      return {
        message: `Approve success`,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  //close form
  async close(updateFromDto: CloseFormDto, id: string): Promise<any> {
    try {
      const condition = { where: { id: id, isDelete: 0 } };
      const Temp = await this.formsRepository.findOne({
        where: {
          id,
          isDelete: 0,
        },
      });
      if (!Temp) {
        return {
          message: `Can not close this form`,
        };
      }
      updateFromDto.id = id;
      updateFromDto.status = FORM_STATUS.CLOSED;
      await this.formsRepository.update(updateFromDto, condition);
      return {
        message: `Close success`,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  //get report about form
  async getReport(reportDto: ReportFormDto): Promise<any> {
    try {
      const FormReport = await this.formsRepository.findAll({
        where: {
          typeOf: reportDto.typeOf,
          status: reportDto.status,
          isDelete: 0,
        },
      });
      const listUserId: string[] = [];
      FormReport.forEach((e) => {
        listUserId.push(e.userId);
      });
      return {
        number: FormReport.length,
        userId: listUserId,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
