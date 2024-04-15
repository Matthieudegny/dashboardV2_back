import { Injectable } from '@nestjs/common';
import { SubOrderDto } from './dto/sub_order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sub_Order } from '../entities/Sub_Order';
//other dtos used
import { GlobalSubOrderDto } from '../main-datas/dto/main-datas.dto';

//services used
import { SsoService } from '../sso/sso.service';
import { ImageSubOrderService } from '../imageSubOrder/imageSubOrder.service';
import { Fs_SoService } from '../fs_so/fs_so.service';

@Injectable()
export class SubOrderService {
  constructor(
    @InjectRepository(Sub_Order)
    private subOrderRepository: Repository<Sub_Order>,
    private readonly ssSoService: SsoService,
    private readonly imageSoService: ImageSubOrderService,
    private readonly fs_So_Service: Fs_SoService,
  ) {}
  create(createSubOrderDto: SubOrderDto): Promise<SubOrderDto> {
    const newSubOrder = this.subOrderRepository.create(createSubOrderDto);
    return this.subOrderRepository.save(newSubOrder);
  }

  findAll() {
    return this.subOrderRepository.find();
  }

  findAllByGlobalOrderId(globalOrderId: number) {
    return this.subOrderRepository.find({
      where: { subOrder_order_id: globalOrderId },
    });
  }

  findOneOrderById(id: number) {
    return this.subOrderRepository.findOneBy({ subOrder_id: id });
  }

  async update(
    id: number,
    updateSubOrderDto: SubOrderDto,
  ): Promise<SubOrderDto> {
    try {
      const subOrderIsUpdated = await this.subOrderRepository.update(
        id,
        updateSubOrderDto,
      );
      if (subOrderIsUpdated.affected > 0) {
        const subOrderUpdated = await this.findOneOrderById(id);
        return subOrderUpdated;
      } else {
        throw new Error('Failed to update the sub order');
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  remove(id: number) {
    try {
      return this.subOrderRepository.delete(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findAndFillSubOrdersByIdGlobalOrderFilledWithDatas(
    globalOrderId: number,
  ) {
    let subOrderList = new Array<GlobalSubOrderDto>();

    //1. first the list of sub orders
    const listSubOrders: Array<SubOrderDto> =
      await this.findAllByGlobalOrderId(globalOrderId);

    //2. then i fill each sub order with its datas
    for (const subOrder of listSubOrders) {
      let subOrderFillWithData: GlobalSubOrderDto = new GlobalSubOrderDto();
      //2.1. fill the sub order with its datas
      subOrderFillWithData.subOrder = subOrder;
      //2.2. fill the setup_so used
      subOrderFillWithData.setupSubOrderList =
        await this.ssSoService.findAllBySubOrderId(subOrder.subOrder_id);
      //2.3. fill the image_so
      subOrderFillWithData.imageSubOrderList =
        await this.imageSoService.findAllBySubOrderId(subOrder.subOrder_id);
      //2.4. fill the failure_so used
      subOrderFillWithData.failureSubOrderList =
        await this.fs_So_Service.findAllBySubOrderId(subOrder.subOrder_id);

      //2.5. add the sub order to the list
      subOrderList.push(subOrderFillWithData);
    }

    return subOrderList;
  }
}
