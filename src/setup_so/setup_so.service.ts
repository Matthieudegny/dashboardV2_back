import { Injectable } from '@nestjs/common';
import { CreateSetupSoDto } from './dto/create-setup_so.dto';
import { UpdateSetupSoDto } from './dto/update-setup_so.dto';

@Injectable()
export class SetupSoService {
  create(createSetupSoDto: CreateSetupSoDto) {
    return 'This action adds a new setupSo';
  }

  findAll() {
    return `This action returns all setupSo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} setupSo`;
  }

  update(id: number, updateSetupSoDto: UpdateSetupSoDto) {
    return `This action updates a #${id} setupSo`;
  }

  remove(id: number) {
    return `This action removes a #${id} setupSo`;
  }
}
