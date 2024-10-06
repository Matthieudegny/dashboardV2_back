import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { S_soa_Dto } from './dto/s_soa.dto';
import { S_soa } from '../entities/Setup/Associations/S_soa';

import { Setup_SubOrder_Add_Dto } from '../setup_SubOrder_Add/dto/setup_SubOrder_Add.dto';
import { Setup_SubOrder_Add_Service } from '../setup_SubOrder_Add/setup_SubOrder_Add.service';

@Injectable()
export class S_Soa_Service {
  constructor(
    @InjectRepository(S_soa)
    private S_soa_Repository: Repository<S_soa>,
    private Setup_SubOrder_Add_Service: Setup_SubOrder_Add_Service,
  ) {}
  create(createSoDto: S_soa_Dto[]): Promise<Setup_SubOrder_Add_Dto[]> {
    try {
      //first i delete all the sg_Go with the same global order id
      if (createSoDto.length > 0) {
        const listIsReset = this.deleteAllSgGoByGlobalOrderId(
          createSoDto[0].s_soa_setupOrder_id,
        );

        if (!listIsReset)
          throw new Error(
            'Error while deleting the sg_Go with the same global order id',
          );
        // Wait for all save operations to complete before returning the list of setups used
        let globalOrderID = createSoDto[0].s_soa_subOrder_id;

        return Promise.all(
          createSoDto.map((sg_Go) => {
            const newSgGo = this.S_soa_Repository.create(sg_Go);
            return this.S_soa_Repository.save(newSgGo);
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
    return this.S_soa_Repository.find();
  }

  async deleteAllSgGoByGlobalOrderId(globalOrderId: number): Promise<boolean> {
    try {
      const listSoByOrderId: Array<S_soa> = await this.S_soa_Repository.find({
        where: { s_soa_subOrder_Add_id: globalOrderId },
      });
      if (listSoByOrderId.length > 0) {
        listSoByOrderId.forEach((sg_Go) => {
          this.S_soa_Repository.delete(sg_Go.s_soa_id);
        });
      }
      return true;
    } catch (error) {
      console.log('error', error);
      throw new Error(error);
    }
  }

  async findAllSetupByOrderId(globalOrderId: number) {
    const listSoByOrderId: Array<S_soa> = await this.S_soa_Repository.find({
      where: { s_soa_subOrder_Add_id: globalOrderId },
    });

    let listSetupGoByOrder: Array<Setup_SubOrder_Add_Dto> = [];
    if (listSoByOrderId.length > 0) {
      //for each sg_Go i get the setup category data
      for (const sg_Go of listSoByOrderId) {
        const setupData: Setup_SubOrder_Add_Dto =
          await this.Setup_SubOrder_Add_Service.findOne(
            sg_Go.s_soa_setup_SubOrder_Add_id,
          );
        //if listSetupCategoriesByGlobalOrder doesnt contain the setup category, i add it
        if (
          !listSetupGoByOrder.some(
            (setup) =>
              setup.setup_SubOrder_Add_id === setupData.setup_SubOrder_Add_id,
          )
        )
          listSetupGoByOrder.push(setupData);
      }
    }

    return listSetupGoByOrder;
  }

  findOne(id: number) {
    return this.S_soa_Repository.findOneBy({ s_soa_id: id });
  }

  update(id: number, updateSetupGoDto: S_soa_Dto) {
    return this.S_soa_Repository.update(id, updateSetupGoDto);
  }

  remove(id: number) {
    return this.S_soa_Repository.delete(id);
  }

  async removeAllByOrderId(orderId: number): Promise<boolean> {
    try {
      const allSoAreRemoved = await this.S_soa_Repository.delete({
        s_soa_subOrder_Add_id: orderId,
      });
      if (allSoAreRemoved.affected > 0) {
        return true;
      }
      return false;
    } catch (error) {
      console.log('error', error);
      throw new Error(error);
    }
  }
}
