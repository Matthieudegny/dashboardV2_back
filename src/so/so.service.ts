import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SoDto } from './dto/so.dto';
import { So } from '../entities/Setup/Associations/So';

import { SetupOrderDto } from '../setupOrder/dto/setup_go.dto';
import { SetupOrderService } from '../setupOrder/setupOrder.service';

@Injectable()
export class SoService {
  constructor(
    @InjectRepository(So)
    private soRepository: Repository<So>,
    private setupOrderService: SetupOrderService,
  ) {}
  create(createSoDto: SoDto[]): Promise<SetupOrderDto[]> {
    console.log('createSoDto', createSoDto);
    try {
      //first i delete all the sg_Go with the same global order id
      if (createSoDto.length > 0) {
        const listIsReset = this.deleteAllSgGoByGlobalOrderId(
          createSoDto[0].so_order_id,
        );

        if (!listIsReset)
          throw new Error(
            'Error while deleting the sg_Go with the same global order id',
          );
        // Wait for all save operations to complete before returning the list of setups used
        let globalOrderID = createSoDto[0].so_order_id;
        console.log('globalOrderID', globalOrderID);

        return Promise.all(
          createSoDto.map((sg_Go) => {
            const newSgGo = this.soRepository.create(sg_Go);
            console.log('newSgGo', newSgGo);
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
        where: { so_order_id: globalOrderId },
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
      where: { so_order_id: globalOrderId },
    });

    let listSetupGoByOrder: Array<SetupOrderDto> = [];
    if (listSoByOrderId.length > 0) {
      //for each sg_Go i get the setup category data
      for (const sg_Go of listSoByOrderId) {
        const setupData: SetupOrderDto = await this.setupOrderService.findOne(
          sg_Go.so_setupOrder_id,
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
    return this.soRepository.findOneBy({ so_id: id });
  }

  update(id: number, updateSetupGoDto: SoDto) {
    return this.soRepository.update(id, updateSetupGoDto);
  }

  remove(id: number) {
    return this.soRepository.delete(id);
  }

  async removeAllByOrderId(orderId: number): Promise<boolean> {
    try {
      const allSoAreRemoved = await this.soRepository.delete({
        so_order_id: orderId,
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
