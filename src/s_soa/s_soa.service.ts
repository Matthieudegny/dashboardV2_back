import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { S_soa_Dto } from './dto/s_soa.dto';
import { S_soa } from '../entities/Setup/Associations/S_soa';

import { SetupOrderDto } from '../setupOrder/dto/setup_go.dto';
import { SetupOrderService } from '../setupOrder/setupOrder.service';

@Injectable()
export class S_Soa_Service {
  constructor(
    @InjectRepository(S_soa)
    private soRepository: Repository<S_soa>,
    private setupOrderService: SetupOrderService,
  ) {}
  create(createSoDto: S_soa_Dto[]): Promise<SetupOrderDto[]> {
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
      const listSoByOrderId: Array<S_soa_Dto> = await this.soRepository.find({
        where: { s_soa_subOrder_id: globalOrderId },
      });
      if (listSoByOrderId.length > 0) {
        listSoByOrderId.forEach((sg_Go) => {
          this.soRepository.delete(sg_Go.s_soa_id);
        });
      }
      return true;
    } catch (error) {
      console.log('error', error);
      throw new Error(error);
    }
  }

  async findAllSetupByOrderId(globalOrderId: number) {
    const listSoByOrderId: Array<S_soa_Dto> = await this.soRepository.find({
      where: { s_soa_subOrder_id: globalOrderId },
    });

    let listSetupGoByOrder: Array<SetupOrderDto> = [];
    if (listSoByOrderId.length > 0) {
      //for each sg_Go i get the setup category data
      for (const sg_Go of listSoByOrderId) {
        const setupData: SetupOrderDto = await this.setupOrderService.findOne(
          sg_Go.s_soa_setupOrder_id,
        );
        //if listSetupCategoriesByGlobalOrder doesnt contain the setup category, i add it
        if (
          !listSetupGoByOrder.some(
            (setup) => setup.setupOrder_id === setupData.setupOrder_id,
          )
        )
          listSetupGoByOrder.push(setupData);
      }
    }

    return listSetupGoByOrder;
  }

  findOne(id: number) {
    return this.soRepository.findOneBy({ s_soa_id: id });
  }

  update(id: number, updateSetupGoDto: S_soa_Dto) {
    return this.soRepository.update(id, updateSetupGoDto);
  }

  remove(id: number) {
    return this.soRepository.delete(id);
  }

  async removeAllByOrderId(orderId: number): Promise<boolean> {
    try {
      const allSoAreRemoved = await this.soRepository.delete({
        s_soa_subOrder_id: orderId,
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
