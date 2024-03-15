import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Sg_GoDto } from './dto/sg_go.dto';
import { Sg_Go } from '../entities/Setup/Associations/Sg_go';

import { SetupGoDto } from '../setup_go/dto/setup_go.dto';
import { SetupGoService } from '../setup_go/setupGo.service';

@Injectable()
export class SgGoService {
  constructor(
    @InjectRepository(Sg_Go)
    private setupGoRepository: Repository<Sg_Go>,
    private setupGoService: SetupGoService,
  ) {}
  create(createSetupGoDto: Sg_GoDto) {
    const newSetupGo = this.setupGoRepository.create(createSetupGoDto);
    return this.setupGoRepository.save(newSetupGo);
  }

  findAll() {
    return this.setupGoRepository.find();
  }

  async findAllByGlobalOrderId(globalOrderId: number) {
    const listSg_GoByGlobalOrderId: Array<Sg_GoDto> =
      await this.setupGoRepository.find({
        where: { sg_go_go_id: globalOrderId },
      });
    let listSetupCategoriesByGlobalOrder: Array<SetupGoDto> = [];
    if (listSg_GoByGlobalOrderId.length > 0) {
      //for each sg_Go i get the setup category data
      for (const sg_Go of listSg_GoByGlobalOrderId) {
        const setupData: SetupGoDto = await this.setupGoService.findOne(
          sg_Go.sg_go_setup_go_id,
        );
        //if listSetupCategoriesByGlobalOrder doesnt contain the setup category, i add it
        if (
          !listSetupCategoriesByGlobalOrder.some(
            (setup) => setup.setup_go_id === setupData.setup_go_id,
          )
        )
          listSetupCategoriesByGlobalOrder.push(setupData);
      }
    }
    return listSetupCategoriesByGlobalOrder;
  }

  findOne(id: number) {
    return this.setupGoRepository.findOneBy({ sg_go_id: id });
  }

  update(id: number, updateSetupGoDto: Sg_GoDto) {
    return this.setupGoRepository.update(id, updateSetupGoDto);
  }

  remove(id: number) {
    return this.setupGoRepository.delete(id);
  }
}
