import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { S_so_Dto } from './dto/s_so.dto';
import { S_so } from '../entities/Setup/Associations/S_so';

import { Suborder_Dto } from '../sub_order/dto/suborder.dto';
import { Setup_SubOrder_Service } from '../setup_SubOrder/setup_SubOrder.service';
import { Setup_SubOrderDto } from '../setup_SubOrder/dto/setup_SubOrder.dto';

@Injectable()
export class S_so_Service {
  constructor(
    @InjectRepository(S_so)
    private ssorRepository: Repository<S_so>,
    private setupSoService: Setup_SubOrder_Service,
  ) {}
  create(createSsDto: S_so_Dto[]): Promise<Setup_SubOrderDto[]> {
    try {
      //first i delete all the Sso with the same sub order id
      const listIsReset = this.deleteAllSsBySubOrderId(
        createSsDto[0].s_so_subOrder_Reduce_id,
      );
      if (!listIsReset)
        throw new Error('Error while deleting the Sso with the same order id');
      if (createSsDto.length > 0) {
        //creation of the new Sso
        // Wait for all save operations to complete before returning the list of setups used
        let subOrderId = createSsDto[0].s_so_subOrder_Reduce_id;

        return Promise.all(
          createSsDto.map((ss_So) => {
            const newSgGo = this.ssorRepository.create(ss_So);

            return this.ssorRepository.save(newSgGo);
          }),
        ).then(() => {
          //return the list created
          return this.findAllBySubOrderId(subOrderId);
        });
      }
    } catch (error) {
      console.log('error', error);
      throw new Error(error);
    }
  }

  async deleteAllSsBySubOrderId(subOrderId: number): Promise<boolean> {
    try {
      const listSsoBySubOrderId: Array<S_so> = await this.ssorRepository.find({
        where: { s_so_subOrder_id: subOrderId },
      });
      if (listSsoBySubOrderId.length > 0) {
        listSsoBySubOrderId.forEach((ss_So) => {
          this.ssorRepository.delete(ss_So.s_so_id);
        });
      }
      return true;
    } catch (error) {
      console.log('error', error);
      throw new Error(error);
    }
  }

  async findAllSetupBySubOrderId(subOrderId: number) {
    try {
      const listSs_SoByGlobalOrderId: Array<S_so> =
        await this.ssorRepository.find({
          where: { s_so_subOrder_id: subOrderId },
        });

      let listSetupSoByGlobalSubOrder: Array<Setup_SubOrderDto> = [];
      if (listSs_SoByGlobalOrderId.length > 0) {
        //for each sg_Go i get the setup category data
        for (const ss_So of listSs_SoByGlobalOrderId) {
          const setupData: Setup_SubOrderDto =
            await this.setupSoService.findOne(ss_So.s_so_setupSubOrder_id);
          //if listSetupCategoriesByGlobalOrder doesnt contain the setup category, i add it
          if (
            !listSetupSoByGlobalSubOrder.some(
              (setup) =>
                setup.setup_SubOrder_id === setupData.setup_SubOrder_id,
            )
          )
            listSetupSoByGlobalSubOrder.push(setupData);
        }
      }

      return listSetupSoByGlobalSubOrder;
    } catch (error) {
      console.log('error', error);
      throw new Error(error);
    }
  }

  findAll() {
    return this.ssorRepository.find();
  }

  public async findAllBySubOrderId(globalOrderId: number) {
    const listSsBySubOrderId = await this.ssorRepository.find({
      where: { s_so_subOrder_id: globalOrderId },
    });
    let listSetupSoBySubOrder: Array<Setup_SubOrderDto> = [];
    if (listSsBySubOrderId.length > 0) {
      //for each ss i get the setupso data
      for (const ss of listSsBySubOrderId) {
        const setupData: Setup_SubOrderDto = await this.setupSoService.findOne(
          ss.s_so_setupSubOrder_id,
        );
        //if listSetupCategoriesBySubOrder doesnt contain the setup category, i add it
        if (
          !listSetupSoBySubOrder.some(
            (setup) => setup.setup_SubOrder_id === setupData.setup_SubOrder_id,
          )
        )
          listSetupSoBySubOrder.push(setupData);
      }
    }
    return listSetupSoBySubOrder;
  }

  findOne(id: number) {
    return this.ssorRepository.findOneBy({ s_so_id: id });
  }

  update(id: number, updateSetupSoDto: S_so_Dto) {
    return this.ssorRepository.update(id, updateSetupSoDto);
  }

  remove(id: number) {
    return this.ssorRepository.delete(id);
  }

  async removeAllBySubOrderId(subOrderId: number): Promise<boolean> {
    try {
      const allSsoAreRemoved = await this.ssorRepository.delete({
        s_so_subOrder_id: subOrderId,
      });
      if (allSsoAreRemoved.affected > 0) {
        return true;
      }
      return false;
    } catch (error) {
      console.log('error', error);
      throw new Error(error);
    }
  }
}
