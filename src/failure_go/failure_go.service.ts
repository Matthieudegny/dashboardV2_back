import { Injectable } from '@nestjs/common';
import { CreateFailureGoDto } from './dto/create-failure_go.dto';
import { UpdateFailureGoDto } from './dto/update-failure_go.dto';

@Injectable()
export class FailureGoService {
  create(createFailureGoDto: CreateFailureGoDto) {
    return 'This action adds a new failureGo';
  }

  findAll() {
    return `This action returns all failureGo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} failureGo`;
  }

  update(id: number, updateFailureGoDto: UpdateFailureGoDto) {
    return `This action updates a #${id} failureGo`;
  }

  remove(id: number) {
    return `This action removes a #${id} failureGo`;
  }
}
