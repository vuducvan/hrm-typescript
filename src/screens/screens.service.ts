import { Injectable, Inject } from '@nestjs/common';
import { Screen } from './screens.entity';

@Injectable()
export class ScreensService {
  constructor(
    @Inject('SCREENS_REPOSITORY')
    private screensRepository: typeof Screen,
  ) {}

  //get all screen with pagging
  async findAll(currentPage: string, pageSize: string): Promise<Screen[]> {
    const page = parseInt(currentPage);
    const size = parseInt(pageSize);
    return this.screensRepository.findAll({
      limit: size,
      offset: (page - 1) * size,
      where: {
        isDelete: 0,
      },
    });
  }

  //get screen by id
  async findOne(id: string): Promise<Screen> {
    return this.screensRepository.findOne({
      where: {
        id,
        isDelete: 0,
      },
    });
  }
}
