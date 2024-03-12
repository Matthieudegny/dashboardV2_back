import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Fs_So } from '../entities/Failure/Associations/Fs_So';
import { Fs_So_Dto } from './dto/fs_So.dto';

import { FailureSoDto } from '../failure_so/dtos/failureSo.dto';
import { FailureSoService } from '../failure_so/failure_so.service';

@Injectable()
export class Fs_SoService {
  constructor(
    @InjectRepository(Fs_So)
    private fs_SoRepository: Repository<Fs_So>,
    private failure_So_Service: FailureSoService,
  ) {}

  create(createFailureSoDto: Fs_So_Dto) {
    const newFailureSo = this.fs_SoRepository.create(createFailureSoDto);
    return this.fs_SoRepository.save(newFailureSo);
  }

  findAll() {
    return this.fs_SoRepository.find();
  }

  //find all the failures categories of a sub order
  async findAllBySubOrderId(globalOrderId: number) {
    const listFailuresGoByGlobalOrderId: Array<Fs_So> =
      await this.fs_SoRepository.find({
        where: { fs_so_id: globalOrderId },
      });

    let listFailuresCategoriesBySubOrder: Array<FailureSoDto> = [];
    if (listFailuresGoByGlobalOrderId.length > 0) {
      //for each failure_go i get the failure category data
      for (const failureGo of listFailuresGoByGlobalOrderId) {
        const failureData: FailureSoDto = await this.failure_So_Service.findOne(
          failureGo.fs_so_failure_so_id,
        );
        //if listFailuresCategoriesBySubOrder doesnt contain the failure category, i add it
        if (
          !listFailuresCategoriesBySubOrder.some(
            (failure) => failure.failure_so_id === failureData.failure_so_id,
          )
        )
          listFailuresCategoriesBySubOrder.push(failureData);
      }
    }
    return listFailuresCategoriesBySubOrder;
  }

  findOne(id: number) {
    return this.fs_SoRepository.findOneBy({ fs_so_id: id });
  }

  update(id: number, updateFailureSoDto: Fs_So_Dto) {
    return this.fs_SoRepository.update(id, updateFailureSoDto);
  }

  remove(id: number) {
    return this.fs_SoRepository.delete(id);
  }
}
