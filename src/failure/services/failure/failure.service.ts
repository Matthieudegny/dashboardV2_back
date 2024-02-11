import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Failure } from 'src/typeorm/entities/Failure';
import { CreateFailureParams } from 'src/utils/types';

@Injectable()
export class FailureService {
  //injection de dépendance pour utiliser le repository Failure (repository = couche de l'ORM)
  constructor(
    @InjectRepository(Failure) private failureRepository: Repository<Failure>,
  ) {}
  findAllFailure() {}

  createFailure(failureDetails: CreateFailureParams) {
    const newFailure = this.failureRepository.create(failureDetails);
    return this.failureRepository.save(failureDetails);
  }
}
