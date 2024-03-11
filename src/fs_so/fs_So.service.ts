import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fs_So } from '../entities/Failure/Associations/Fs_So';
import { Fs_So_Dto } from './dto/fs_So.dto';
import { FailureDto } from '../failure/dtos/failure.dto';
import { FailureService } from '../failure/failure.service';
@Injectable()
export class Fs_So_Service {
  constructor(
    @InjectRepository(Fs_So)
    private failureSoRepository: Repository<Fs_So>,
    private failureService: FailureService,
  ) {}
  create(createFailureSoDto: Fs_So_Dto) {
    const newFailureSo = this.failureSoRepository.create(createFailureSoDto);
    return this.failureSoRepository.save(newFailureSo);
  }

  findAll() {
    return this.failureSoRepository.find();
  }

  async findAllBySubOrderId(globalOrderId: number) {
    const listFailuresGoByGlobalOrderId: Array<Fs_So> =
      await this.failureSoRepository.find({
        where: { fs_so_id: globalOrderId },
      });

    let listFailuresCategoriesBySubOrder: Array<FailureDto> = [];
    if (listFailuresGoByGlobalOrderId.length > 0) {
      //for each failure_go i get the failure category data
      for (const failureGo of listFailuresGoByGlobalOrderId) {
        const failureData: FailureDto = await this.failureService.findOne(
          failureGo.fs_so_failure_so_id,
        );
        //if listFailuresCategoriesBySubOrder doesnt contain the failure category, i add it
        if (
          !listFailuresCategoriesBySubOrder.some(
            (failure) => failure.failure_id === failureData.failure_id,
          )
        )
          listFailuresCategoriesBySubOrder.push(failureData);
      }
    }
    return listFailuresCategoriesBySubOrder;
  }

  findOne(id: number) {
    return this.failureSoRepository.findOneBy({ fs_so_id: id });
  }

  update(id: number, updateFailureSoDto: Fs_So_Dto) {
    return this.failureSoRepository.update(id, updateFailureSoDto);
  }

  remove(id: number) {
    return this.failureSoRepository.delete(id);
  }
}
