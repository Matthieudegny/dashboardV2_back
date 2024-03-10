import { Injectable } from '@nestjs/common';
import { SetupGoDto } from './dto/setup_go.dto';
import { SetupDto } from '../setup/dto/setup.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Setup_Go } from '../entities/setup/Setup_go';
import { SetupService } from '../setup/setup.service';

@Injectable()
export class SetupGoService {
  constructor(
    @InjectRepository(Setup_Go)
    private setupGoRepository: Repository<Setup_Go>,
    private setupService: SetupService,
  ) {}
  create(createSetupGoDto: SetupGoDto) {
    const newSetupGo = this.setupGoRepository.create(createSetupGoDto);
    return this.setupGoRepository.save(newSetupGo);
  }

  findAll() {
    return this.setupGoRepository.find();
  }

  async findAllByGlobalOrderId(globalOrderId: number) {
    const listSetUpGoByGlobalOrderId: Array<SetupGoDto> =
      await this.setupGoRepository.find({
        where: { setup_go_go_id: globalOrderId },
      });
    let listSetupCategoriesByGlobalOrder: Array<SetupDto> = [];
    if (listSetUpGoByGlobalOrderId.length > 0) {
      //for each setup_go i get the setup category data
      for (const setupGo of listSetUpGoByGlobalOrderId) {
        const setupData: SetupDto = await this.setupService.findOne(
          setupGo.setup_go_setup_id,
        );
        //if listSetupCategoriesByGlobalOrder doesnt contain the setup category, i add it
        if (
          !listSetupCategoriesByGlobalOrder.some(
            (setup) => setup.setup_id === setupData.setup_id,
          )
        )
          listSetupCategoriesByGlobalOrder.push(setupData);
      }
    }
    return listSetupCategoriesByGlobalOrder;
  }

  findOne(id: number) {
    return this.setupGoRepository.findOneBy({ setup_go_id: id });
  }

  update(id: number, updateSetupGoDto: SetupGoDto) {
    return this.setupGoRepository.update(id, updateSetupGoDto);
  }

  remove(id: number) {
    return this.setupGoRepository.delete(id);
  }
}
