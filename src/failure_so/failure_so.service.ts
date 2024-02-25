import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Failure_So } from '../entities/Failure/Failure_so';
import { Failure_SoDto } from './dto/failure_so.dto';
import { FailureDto } from '../failure/dtos/failure.dto';
import { FailureService } from '../failure/failure.service';
@Injectable()
export class FailureSoService {
  constructor(
    @InjectRepository(Failure_So)
    private failureSoRepository: Repository<Failure_So>,
    private failureService: FailureService,
  ) {}
  create(createFailureSoDto: Failure_SoDto) {
    const newFailureSo = this.failureSoRepository.create(createFailureSoDto);
    return this.failureSoRepository.save(newFailureSo);
  }

  findAll() {
    return this.failureSoRepository.find();
  }

  async findAllBySubOrderId(globalOrderId: number) {
    const listFailuresGoByGlobalOrderId: Array<Failure_So> =
      await this.failureSoRepository.find({
        where: { failure_so_id: globalOrderId },
      });

    let listFailuresCategoriesBySubOrder: Array<FailureDto> = [];
    if (listFailuresGoByGlobalOrderId.length > 0) {
      //for each failure_go i get the failure category data
      for (const failureGo of listFailuresGoByGlobalOrderId) {
        const failureData: FailureDto = await this.failureService.findOne(
          failureGo.failure_so_failure_id,
        );
        listFailuresCategoriesBySubOrder.push(failureData);
      }
    }
    return listFailuresCategoriesBySubOrder;
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
