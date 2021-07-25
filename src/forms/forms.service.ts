import { Injectable, Inject } from '@nestjs/common';
import { Form } from './forms.entity';

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
}
