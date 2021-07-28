import { Injectable, Inject } from '@nestjs/common';
import { FORM_STATUS } from '../const/formStatus.enum';
import { CreateFromDto } from './dto/createFrom.dto';
import { Form } from './forms.entity';
import { UpdateFromDto } from './dto/updateForm.dto';

@Injectable()
export class FormsService {
  constructor(
    @Inject('FORMS_REPOSITORY')
    private formsRepository: typeof Form,
  ) {}

  //get all form with pagging
  async findAll(currentPage: string, pageSize: string): Promise<Form[]> {
    const page = parseInt(currentPage);
    const size = parseInt(pageSize);
    return this.formsRepository.findAll({
      limit: size,
      offset: (page - 1) * size,
      where: {
        isDelete: 0,
      },
    });
  }

  //get form by id
  async findOne(id: string): Promise<Form> {
    return this.formsRepository.findOne({
      where: {
        id,
        isDelete: 0,
      },
    });
  }

  // //create new form
  // async create(createFormDto: CreateFromDto): Promise<any> {
  //   createFormDto.isDelete = 0;
  //   createFormDto.status = FORM_STATUS.NEW;
  //   let tempFromDto: CreateFromDto;
  //   const listEmail: string[] = [];
  //   const listEmployee = [];
  //   (await createFormDto.userId).forEach((e) => {
  //     tempFromDto.userId = e;
  //     listEmail.push(e.email);
  //     listEmployee.push(createFormDto);
  //   });
  //   if (!(await this.formsRepository.bulkCreate(listEmployee))) {
  //     return {
  //       message: `Can not create forms`,
  //     };
  //   }
  //   return {
  //     message: `Create success`,
  //   };
  // }

  //delete form by update isDelete = 1
  async deleteFrom(id: string): Promise<any> {
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
  }

  //update form by id
  async update(updateFromDto: UpdateFromDto, id: string): Promise<any> {
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
    await this.formsRepository.update(updateFromDto, condition);
    return {
      message: `Update success`,
    };
  }
}
