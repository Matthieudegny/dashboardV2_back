import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SetupSoDto } from './dto/setup_so.dto';
import { Setup_So } from '../entities/setup/Setup_so';
import { SetupDto } from '../setup/dto/setup.dto';
import { SetupService } from '../setup/setup.service';

@Injectable()
export class SetupSoService {
  constructor(
    @InjectRepository(Setup_So)
    private setupSoRepository: Repository<Setup_So>,
    private setupService: SetupService,
  ) {}
  create(createSetupSoDto: SetupSoDto) {
    const newSetupSo = this.setupSoRepository.create(createSetupSoDto);
    return this.setupSoRepository.save(newSetupSo);
  }

  findAll() {
    return this.setupSoRepository.find();
  }

  public async findAllBySubOrderId(globalOrderId: number) {
    const listSetUpSoBySubOrderId = await this.setupSoRepository.find({
      where: { setup_so_id: globalOrderId },
    });
    let listSetupCategoriesBySubOrder: Array<SetupDto> = [];
    if (listSetUpSoBySubOrderId.length > 0) {
      //for each setup_so i get the setup category data
      for (const setupSo of listSetUpSoBySubOrderId) {
        const setupData: SetupDto = await this.setupService.findOne(
          setupSo.setup_so_setup_id,
        );
        //if listSetupCategoriesBySubOrder doesnt contain the setup category, i add it
        if (
          !listSetupCategoriesBySubOrder.some(
            (setup) => setup.setup_id === setupData.setup_id,
          )
        )
          listSetupCategoriesBySubOrder.push(setupData);
      }
    }
    return listSetupCategoriesBySubOrder;
  }

  findOne(id: number) {
    return this.setupSoRepository.findOneBy({ setup_so_id: id });
  }

  update(id: number, updateSetupSoDto: SetupSoDto) {
    return this.setupSoRepository.update(id, updateSetupSoDto);
  }

  remove(id: number) {
    return this.setupSoRepository.delete(id);
  }
}
