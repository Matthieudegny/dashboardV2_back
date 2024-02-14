import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Failure_So } from '../entities/Failure/Failure_so';
import { Failure_SoDto } from './dto/failure_so.dto';
@Injectable()
export class FailureSoService {
  constructor(
    @InjectRepository(Failure_So)
    private failureSoRepository: Repository<Failure_So>,
  ) {}
  create(createFailureSoDto: Failure_SoDto) {
    const newFailureSo = this.failureSoRepository.create(createFailureSoDto);
    return this.failureSoRepository.save(newFailureSo);
  }

  findAll() {
    return this.failureSoRepository.find();
  }

  findOne(id: number) {
    return this.failureSoRepository.findOneBy({ failure_so_id: id });
  }

  update(id: number, updateFailureSoDto: Failure_SoDto) {
    return this.failureSoRepository.update(id, updateFailureSoDto);
  }

  remove(id: number) {
    return this.failureSoRepository.delete(id);
  }
}
