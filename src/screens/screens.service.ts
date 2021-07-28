import { Injectable, Inject } from '@nestjs/common';
import { CreateScreenDto } from './dto/createScreen.dto';
import { UpdateScreenDto } from './dto/updateScreen.dto';
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

  //create new screen
  async create(createScreenDto: CreateScreenDto): Promise<Screen> {
    createScreenDto.isDelete = 0;
    return await this.screensRepository.create<Screen>(createScreenDto);
  }

  //delete screen by update isDelete = 1
  async deleteScreen(id: string): Promise<any> {
    const screenTemp = await this.screensRepository.findOne({
      where: {
        id,
        isDelete: 0,
      },
    });
    if (!screenTemp) {
      return {
        message: `Can not delete this screen`,
      };
    }
    screenTemp.isDelete = 1;
    await screenTemp.save();
    return {
      message: `Delete success`,
    };
  }

  //update screen by id
  async update(updateScreenDto: UpdateScreenDto, id: string): Promise<any> {
    const condition = { where: { id: id, isDelete: 0 } };
    const screenTemp: Screen = await this.screensRepository.findOne({
      where: {
        id,
        isDelete: 0,
      },
    });
    if (!screenTemp) {
      return {
        message: `Can not update this screen`,
      };
    }
    await this.screensRepository.update(updateScreenDto, condition);
    return {
      message: `Update success`,
    };
  }
}
