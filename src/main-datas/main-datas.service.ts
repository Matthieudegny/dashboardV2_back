import { Injectable } from '@nestjs/common';
import { CreateMainDataDto } from './dto/create-main-data.dto';
import { UpdateMainDataDto } from './dto/update-main-data.dto';

@Injectable()
export class MainDatasService {
  create(createMainDataDto: CreateMainDataDto) {
    return 'This action adds a new mainData';
  }

  findAll() {
    return `This action returns all mainDatas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mainData`;
  }

  update(id: number, updateMainDataDto: UpdateMainDataDto) {
    return `This action updates a #${id} mainData`;
  }

  remove(id: number) {
    return `This action removes a #${id} mainData`;
  }
}
