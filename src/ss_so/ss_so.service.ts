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
    private ssSoRepository: Repository<Ss_So>,
    private setupSoService: SetupSoService,
  ) {}
  create(createSsSoDto: Ss_SoDto[]): Promise<SetupSoDto[]> {
    try {
      //first i delete all the sg_Go with the same sub global order id
      const listIsReset = this.deleteAllSsSoBySubGlobalOrderId(
        createSsSoDto[0].ss_so_so_id,
      );
      if (!listIsReset)
        throw new Error(
          'Error while deleting the sg_Go with the same global order id',
        );
      // Wait for all save operations to complete before returning the list of setups used
      if (createSsSoDto.length > 0) {
        let globalSubOrderId = createSsSoDto[0].ss_so_so_id;
        return Promise.all(
          createSsSoDto.map((ss_So) => {
            const newSgGo = this.ssSoRepository.create(ss_So);

            return this.ssSoRepository.save(newSgGo);
          }),
        ).then(() => {
          return this.findAllSetupByGlobalSubOrderId(globalSubOrderId);
        });
      }
    } catch (error) {
      console.log('error', error);
      throw new Error(error);
    }
  }

  async deleteAllSsSoBySubGlobalOrderId(
    globalSubOrderId: number,
  ): Promise<boolean> {
    try {
      console.log('globalSubOrderId', globalSubOrderId);
      const listSg_GoByGlobalOrderId: Array<Ss_SoDto> =
        await this.ssSoRepository.find({
          where: { ss_so_so_id: globalSubOrderId },
        });
      if (listSg_GoByGlobalOrderId.length > 0) {
        listSg_GoByGlobalOrderId.forEach((ss_So) => {
          this.ssSoRepository.delete(ss_So.ss_so_so_id);
        });
      }
      return true;
    } catch (error) {
      console.log('error', error);
      throw new Error(error);
    }
  }

  async findAllSetupByGlobalSubOrderId(globalSubOrderId: number) {
    try {
      const listSs_SoByGlobalOrderId: Array<Ss_SoDto> =
        await this.ssSoRepository.find({
          where: { ss_so_so_id: globalSubOrderId },
        });

      let listSetupCategoriesByGlobalSubOrder: Array<SetupSoDto> = [];
      if (listSs_SoByGlobalOrderId.length > 0) {
        //for each sg_Go i get the setup category data
        for (const ss_So of listSs_SoByGlobalOrderId) {
          const setupData: SetupSoDto = await this.setupSoService.findOne(
            ss_So.ss_so_setup_so_id,
          );
          //if listSetupCategoriesByGlobalOrder doesnt contain the setup category, i add it
          if (
            !listSetupCategoriesByGlobalSubOrder.some(
              (setup) => setup.setup_so_id === setupData.setup_so_id,
            )
          )
            listSetupCategoriesByGlobalSubOrder.push(setupData);
        }
      }

      return listSetupCategoriesByGlobalSubOrder;
    } catch (error) {
      console.log('error', error);
      throw new Error(error);
    }
  }

  findAll() {
    return this.ssSoRepository.find();
  }

  public async findAllBySubOrderId(globalOrderId: number) {
    const listSs_soBySubOrderId = await this.ssSoRepository.find({
      where: { ss_so_so_id: globalOrderId },
    });
    let listSetupSoCategoriesBySubOrder: Array<SetupSoDto> = [];
    if (listSs_soBySubOrderId.length > 0) {
      //for each ss_so i get the setup category data
      for (const setupSo of listSs_soBySubOrderId) {
        const setupData: SetupSoDto = await this.setupSoService.findOne(
          setupSo.ss_so_setup_so_id,
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
    return this.ssSoRepository.findOneBy({ ss_so_id: id });
  }

  update(id: number, updateSetupSoDto: Ss_SoDto) {
    return this.ssSoRepository.update(id, updateSetupSoDto);
  }

  remove(id: number) {
    return this.ssSoRepository.delete(id);
  }
}
