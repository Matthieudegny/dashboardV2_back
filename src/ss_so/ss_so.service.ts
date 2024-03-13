import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Ss_SoDto } from './dto/ss_so.dto';
import { Ss_So } from '../entities/Setup/Associations/Ss_so';

import { SetupSoDto } from '../setup_so/dto/setupSo.dto';
import { SetupSoService } from '../setup_so/setupSo.service';

@Injectable()
export class SsSoService {
  constructor(
    @InjectRepository(Ss_So)
    private setupSoRepository: Repository<Ss_So>,
    private setupSoService: SetupSoService,
  ) {}
  create(createSetupSoDto: Ss_SoDto) {
    const newSetupSo = this.setupSoRepository.create(createSetupSoDto);
    return this.setupSoRepository.save(newSetupSo);
  }

  findAll() {
    return this.setupSoRepository.find();
  }

  public async findAllBySubOrderId(globalOrderId: number) {
    const listSs_soBySubOrderId = await this.setupSoRepository.find({
      where: { ss_so_so_id: globalOrderId },
    });
    let listSetupSoCategoriesBySubOrder: Array<SetupSoDto> = [];
    if (listSs_soBySubOrderId.length > 0) {
      //for each ss_so i get the setup category data
      for (const setupSo of listSs_soBySubOrderId) {
        const setupData: SetupSoDto = await this.setupSoService.findOne(
          setupSo.ss_so_setup_id,
        );
        //if listSetupCategoriesBySubOrder doesnt contain the setup category, i add it
        if (
          !listSetupSoCategoriesBySubOrder.some(
            (setup) => setup.setup_so_id === setupData.setup_so_id,
          )
        )
          listSetupSoCategoriesBySubOrder.push(setupData);
      }
    }
    return listSetupSoCategoriesBySubOrder;
  }

  findOne(id: number) {
    return this.setupSoRepository.findOneBy({ ss_so_id: id });
  }

  update(id: number, updateSetupSoDto: Ss_SoDto) {
    return this.setupSoRepository.update(id, updateSetupSoDto);
  }

  remove(id: number) {
    return this.setupSoRepository.delete(id);
  }
}
