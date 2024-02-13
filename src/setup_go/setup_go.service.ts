import { Injectable } from '@nestjs/common';
import { CreateSetupGoDto } from './dto/create-setup_go.dto';
import { UpdateSetupGoDto } from './dto/update-setup_go.dto';

@Injectable()
export class SetupGoService {
  create(createSetupGoDto: CreateSetupGoDto) {
    return 'This action adds a new setupGo';
  }

  findAll() {
    return `This action returns all setupGo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} setupGo`;
  }

  update(id: number, updateSetupGoDto: UpdateSetupGoDto) {
    return `This action updates a #${id} setupGo`;
  }

  remove(id: number) {
    return `This action removes a #${id} setupGo`;
  }
}
