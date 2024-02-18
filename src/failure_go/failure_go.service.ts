import { Injectable } from '@nestjs/common';
import { Failure_GoDto } from './dto/failure_go.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Failure_Go } from '../entities/Failure/Failure_go';

@Injectable()
export class FailureGoService {
  constructor(
    @InjectRepository(Failure_Go)
    private failureGoRepository: Repository<Failure_Go>,
  ) {}
  createFailure_go(createFailureGoDto: Failure_GoDto) {
    const newFailureGo = this.failureGoRepository.create(createFailureGoDto);
    return this.failureGoRepository.save(newFailureGo);
  }

  findAll() {
    return this.failureGoRepository.find();
  }

  findOne(id: number) {
    return this.failureGoRepository.findOneBy({ failure_go_id: id });
  }

  update(id: number, updateFailureGoDto: Failure_GoDto) {
    return this.failureGoRepository.update(id, updateFailureGoDto);
  }

  remove(id: number) {
    return this.failureGoRepository.delete(id);
  }
}
