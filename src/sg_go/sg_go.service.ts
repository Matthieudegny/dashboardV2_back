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
    private sgGoRepository: Repository<Sg_Go>,
    private setupGoService: SetupGoService,
  ) {}
  create(createSgGosDto: Sg_GoDto[]): Promise<SetupGoDto[]> {
    console.log('createSgGosDto', createSgGosDto);
    try {
      //first i delete all the sg_Go with the same global order id
      const listIsReset = this.deleteAllSgGoByGlobalOrderId(
        createSgGosDto[0].sg_go_go_id,
      );

      if (!listIsReset)
        throw new Error(
          'Error while deleting the sg_Go with the same global order id',
        );
      // Wait for all save operations to complete before returning the list of setups used
      if (createSgGosDto.length > 0) {
        let globalOrderID = createSgGosDto[0].sg_go_go_id;

        return Promise.all(
          createSgGosDto.map((sg_Go) => {
            const newSgGo = this.sgGoRepository.create(sg_Go);

            return this.sgGoRepository.save(newSgGo);
          }),
        ).then(() => {
          return this.findAllSetupByGlobalOrderId(globalOrderID);
        });
      }
    } catch (error) {
      console.log('error', error);
      throw new Error(error);
    }
  }

  findAll() {
    return this.sgGoRepository.find();
  }

  async deleteAllSgGoByGlobalOrderId(globalOrderId: number): Promise<boolean> {
    try {
      const listSg_GoByGlobalOrderId: Array<Sg_GoDto> =
        await this.sgGoRepository.find({
          where: { sg_go_go_id: globalOrderId },
        });
      if (listSg_GoByGlobalOrderId.length > 0) {
        listSg_GoByGlobalOrderId.forEach((sg_Go) => {
          this.sgGoRepository.delete(sg_Go.sg_go_id);
        });
      }
      return true;
    } catch (error) {
      console.log('error', error);
      throw new Error(error);
    }
  }

  async findAllSetupByGlobalOrderId(globalOrderId: number) {
    const listSg_GoByGlobalOrderId: Array<Sg_GoDto> =
      await this.sgGoRepository.find({
        where: { sg_go_go_id: globalOrderId },
      });
    console.log(
      'listSg_GoByGlobalOrderId.length',
      listSg_GoByGlobalOrderId.length,
    );
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
    console.log(
      'listSetupCategoriesByGlobalOrder',
      listSetupCategoriesByGlobalOrder,
    );
    return listSetupCategoriesByGlobalOrder;
  }

  findOne(id: number) {
    return this.sgGoRepository.findOneBy({ sg_go_id: id });
  }

  update(id: number, updateSetupGoDto: Sg_GoDto) {
    return this.sgGoRepository.update(id, updateSetupGoDto);
  }

  remove(id: number) {
    return this.sgGoRepository.delete(id);
  }
}
