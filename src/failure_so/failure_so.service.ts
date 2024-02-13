import { Injectable } from '@nestjs/common';
import { CreateFailureSoDto } from './dto/create-failure_so.dto';
import { UpdateFailureSoDto } from './dto/update-failure_so.dto';

@Injectable()
export class FailureSoService {
  create(createFailureSoDto: CreateFailureSoDto) {
    return 'This action adds a new failureSo';
  }

  findAll() {
    return `This action returns all failureSo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} failureSo`;
  }

  update(id: number, updateFailureSoDto: UpdateFailureSoDto) {
    return `This action updates a #${id} failureSo`;
  }

  remove(id: number) {
    return `This action removes a #${id} failureSo`;
  }
}
