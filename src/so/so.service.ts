import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SoDto } from './dto/so.dto';
import { So } from '../entities/Setup/Associations/So';

import { SetupGoDto } from '../setup_go/dto/setup_go.dto';
import { SetupGoService } from '../setup_go/setupGo.service';

@Injectable()
export class SoService {
  constructor(
    @InjectRepository(So)
    private soRepository: Repository<So>,
    private setupGoService: SetupGoService,
  ) {}
  create(createSoDto: SoDto[]): Promise<SetupGoDto[]> {
    try {
      //first i delete all the sg_Go with the same global order id
      const listIsReset = this.deleteAllSgGoByGlobalOrderId(
        createSoDto[0].so_go_id,
      );

      if (!listIsReset)
        throw new Error(
          'Error while deleting the sg_Go with the same global order id',
        );
      // Wait for all save operations to complete before returning the list of setups used
      if (createSoDto.length > 0) {
        let globalOrderID = createSoDto[0].so_go_id;

        return Promise.all(
          createSoDto.map((sg_Go) => {
            const newSgGo = this.soRepository.create(sg_Go);
            return this.soRepository.save(newSgGo);
          }),
        ).then(() => {
          return this.findAllSetupByOrderId(globalOrderID);
        });
      }
    } catch (error) {
      console.log('error', error);
      throw new Error(error);
    }
  }

  findAll() {
    return this.soRepository.find();
  }

  async deleteAllSgGoByGlobalOrderId(globalOrderId: number): Promise<boolean> {
    try {
      const listSoByOrderId: Array<SoDto> = await this.soRepository.find({
        where: { so_go_id: globalOrderId },
      });
      if (listSoByOrderId.length > 0) {
        listSoByOrderId.forEach((sg_Go) => {
          this.soRepository.delete(sg_Go.so_id);
        });
      }
      return true;
    } catch (error) {
      console.log('error', error);
      throw new Error(error);
    }
  }

  async findAllSetupByOrderId(globalOrderId: number) {
    const listSoByOrderId: Array<SoDto> = await this.soRepository.find({
      where: { so_go_id: globalOrderId },
    });

    let listSetupGoByOrder: Array<SetupGoDto> = [];
    if (listSoByOrderId.length > 0) {
      //for each sg_Go i get the setup category data
      for (const sg_Go of listSoByOrderId) {
        const setupData: SetupGoDto = await this.setupGoService.findOne(
          sg_Go.so_setup_go_id,
        );
        //if listSetupCategoriesByGlobalOrder doesnt contain the setup category, i add it
        if (
          !listSetupGoByOrder.some(
            (setup) => setup.setup_go_id === setupData.setup_go_id,
          )
        )
          listSetupGoByOrder.push(setupData);
      }
    }

    return listSetupGoByOrder;
  }

  findOne(id: number) {
    return this.soRepository.findOneBy({ so_id: id });
  }

  update(id: number, updateSetupGoDto: SoDto) {
    return this.soRepository.update(id, updateSetupGoDto);
  }

  remove(id: number) {
    return this.soRepository.delete(id);
  }
}
