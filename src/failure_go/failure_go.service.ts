import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Failure_go } from 'src/entities/Failure/Failure_go';
import { CreateFailureGoParams } from '../utils/types';

@Injectable()
export class FailureGoService {
  constructor(
    @InjectRepository(Failure_go)
    private failureRepository: Repository<Failure_go>,
  ) {}
  findAllFailure() {
    return this.failureRepository.find();
  }

  findOne(id: number) {
    return this.failureRepository.findOneBy({ failure_go_id: id });
  }

  createFailure(failureDetails: CreateFailureGoParams) {
    const newFailure = this.failureRepository.create(failureDetails);
    return this.failureRepository.save(newFailure);
  }

  updateFailure(id: number, failureDetails: CreateFailureGoParams) {
    return this.failureRepository.update(id, failureDetails);
  }

  deleteFailure(id: number) {
    return this.failureRepository.delete(id);
  }
}
