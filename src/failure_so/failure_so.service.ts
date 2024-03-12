import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Failure_so } from '../entities/Failure/Failure_so';
import { CreateFailureSoParams } from '../utils/types';

@Injectable()
export class FailureSoService {
  constructor(
    @InjectRepository(Failure_so)
    private failureRepository: Repository<Failure_so>,
  ) {}
  findAllFailure() {
    return this.failureRepository.find();
  }

  findOne(id: number) {
    return this.failureRepository.findOneBy({ failure_so_id: id });
  }

  createFailure(failureDetails: CreateFailureSoParams) {
    const newFailure = this.failureRepository.create(failureDetails);
    return this.failureRepository.save(newFailure);
  }

  updateFailure(id: number, failureDetails: CreateFailureSoParams) {
    return this.failureRepository.update(id, failureDetails);
  }

  deleteFailure(id: number) {
    return this.failureRepository.delete(id);
  }
}
