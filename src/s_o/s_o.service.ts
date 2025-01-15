import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { S_o_Dto } from './dto/s_o.dto';
import { S_o } from '../entities/Setup/Associations/S_o';

import { SetupOrderDto } from '../setupOrder/dto/setup_go.dto';
import { SetupOrderService } from '../setupOrder/setupOrder.service';

@Injectable()
export class S_o_Service {
  constructor(
    @InjectRepository(S_o)
    private soRepository: Repository<S_o>,
    private setupOrderService: SetupOrderService,
  ) {}
  updateListSo(createSoDto: S_o_Dto[]): Promise<SetupOrderDto[]> {
    try {
      //first i delete all the sg_Go with the same global order id
      if (createSoDto.length > 0) {
        const listIsReset = this.deleteAllSgGoByGlobalOrderId(
          createSoDto[0].s_o_order_id,
        );

        if (!listIsReset)
          throw new Error(
            'Error while deleting the sg_Go with the same global order id',
          );
        // Wait for all save operations to complete before returning the list of setups used
        let globalOrderID = createSoDto[0].s_o_order_id;

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
      const listSoByOrderId: Array<S_o_Dto> = await this.soRepository.find({
        where: { s_o_order_id: globalOrderId },
      });
      if (listSoByOrderId.length > 0) {
        listSoByOrderId.forEach((sg_Go) => {
          this.soRepository.delete(sg_Go.s_o_id);
        });
      }
      return true;
    } catch (error) {
      console.log('error', error);
      throw new Error(error);
    }
  }

  async findAllSetupByOrderId(globalOrderId: number) {
    // fetch the association list of setup_order - order
    const listSoByOrderId: Array<S_o_Dto> = await this.soRepository.find({
      where: { s_o_order_id: globalOrderId },
    });

    let listSetupGoByOrder: Array<SetupOrderDto> = [];
    if (listSoByOrderId.length > 0) {
      //for each so i fetch the setup order data
      for (const so of listSoByOrderId) {
        const setupData: SetupOrderDto = await this.setupOrderService.findOne(
          so.s_o_setupOrder_id,
        );
        //if item is not already in the list, i add it
        if (
          !listSetupGoByOrder.some(
            (setup) => setup.setup_Order_id === setupData.setup_Order_id,
          )
        )
          listSetupGoByOrder.push(setupData);
      }
    }

    return listSetupGoByOrder;
  }

  findOne(id: number) {
    return this.soRepository.findOneBy({ s_o_id: id });
  }

  update(id: number, updateSetupGoDto: S_o_Dto) {
    return this.soRepository.update(id, updateSetupGoDto);
  }

  remove(id: number) {
    return this.soRepository.delete(id);
  }

  async removeAllByOrderId(orderId: number): Promise<boolean> {
    try {
      const allSoAreRemoved = await this.soRepository.delete({
        s_o_order_id: orderId,
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
