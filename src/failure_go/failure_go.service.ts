import { Injectable } from '@nestjs/common';
import { Failure_GoDto } from './dto/failure_go.dto';
import { FailureDto } from '../failure/dtos/failure.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Failure_Go } from '../entities/Failure/Failure_go';
import { FailureService } from '../failure/failure.service';

@Injectable()
export class FailureGoService {
  constructor(
    @InjectRepository(Failure_Go)
    private failureGoRepository: Repository<Failure_Go>,
    private failureService: FailureService,
  ) {}
  createFailure_go(createFailureGoDto: Failure_GoDto) {
    const newFailureGo = this.failureGoRepository.create(createFailureGoDto);
    return this.failureGoRepository.save(newFailureGo);
  }

  findAll() {
    return this.failureGoRepository.find();
  }

  async findAllFailureCategoriesByGlobalOrderId(globalOrderId: number) {
    const listFailuresGoByGlobalOrderId: Array<Failure_Go> =
      await this.failureGoRepository.find({
        where: { failure_go_id: globalOrderId },
      });

    let listFailuresCategoriesByGlobalOrder: Array<FailureDto> = [];
    if (listFailuresGoByGlobalOrderId.length > 0) {
      //for each failure_go i get the failure category data
      for (const failureGo of listFailuresGoByGlobalOrderId) {
        const failureData: FailureDto = await this.failureService.findOne(
          failureGo.failure_go_failure_id,
        );
        listFailuresCategoriesByGlobalOrder.push(failureData);
      }
    }
    return listFailuresCategoriesByGlobalOrder;
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
