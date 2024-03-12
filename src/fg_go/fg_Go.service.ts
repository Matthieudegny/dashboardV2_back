import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Fg_Go } from '../entities/Failure/Associations/Fg_go';
import { Fg_Go_Dto } from './dto/fg_Go.dto';

import { FailureGoDto } from 'src/failure_go/dtos/failure_go.dto';
import { FailureGoService } from '../failure_go/failure_go.service';

@Injectable()
export class Fg_GoService {
  constructor(
    @InjectRepository(Fg_Go)
    private fg_GoRepository: Repository<Fg_Go>,
    private failureGoService: FailureGoService,
  ) {}
  createFailure_go(createFailureGoDto: Fg_Go_Dto) {
    const newFailureGo = this.fg_GoRepository.create(createFailureGoDto);
    return this.fg_GoRepository.save(newFailureGo);
  }

  findAll() {
    return this.fg_GoRepository.find();
  }

  async findAllByGlobalOrderId(globalOrderId: number) {
    const listFailuresGoByGlobalOrderId: Array<Fg_Go> =
      await this.fg_GoRepository.find({
        where: { fg_go_go_id: globalOrderId },
      });

    let listFailuresCategoriesByGlobalOrder: Array<FailureGoDto> = [];
    if (listFailuresGoByGlobalOrderId.length > 0) {
      //for each failure_go i get the failure category data which correspond
      for (const failureGo of listFailuresGoByGlobalOrderId) {
        const failureData: FailureGoDto = await this.failureGoService.findOne(
          failureGo.fg_go_failure_go_id,
        );
        //if listFailuresCategoriesByGlobalOrder doesnt contain the failure category, i add it
        if (
          !listFailuresCategoriesByGlobalOrder.some(
            (failure) => failure.failure_go_id === failureData.failure_go_id,
          )
        )
          listFailuresCategoriesByGlobalOrder.push(failureData);
      }
    }
    return listFailuresCategoriesByGlobalOrder;
  }

  findOne(id: number) {
    return this.fg_GoRepository.findOneBy({ fg_go_id: id });
  }

  update(id: number, updateFailureGoDto: Fg_Go_Dto) {
    return this.fg_GoRepository.update(id, updateFailureGoDto);
  }

  remove(id: number) {
    return this.fg_GoRepository.delete(id);
  }
}
