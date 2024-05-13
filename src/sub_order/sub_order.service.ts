import { Injectable, forwardRef, Inject } from '@nestjs/common';
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
import { OrderService } from '../order/order.service';
import { OrderDto } from 'src/order/dto/order.dto';

@Injectable()
export class SubOrderService {
  constructor(
    @InjectRepository(Sub_Order)
    private subOrderRepository: Repository<Sub_Order>,
    private readonly ssSoService: SsoService,
    private readonly imageSoService: ImageSubOrderService,
    private readonly fs_So_Service: Fs_SoService,
    @Inject(forwardRef(() => OrderService))
    private orderService: OrderService,
  ) {}

  async create(
    createSubOrderDto: SubOrderDto,
  ): Promise<{ suborder: SubOrderDto; order: OrderDto }> {
    try {
      const newSubOrder = this.subOrderRepository.create(createSubOrderDto);
      const result = await this.subOrderRepository.save(newSubOrder);
      if (result) {
        //update the order  with the new suborder (result, status)
        const orderResultIsUpdated = await this.orderService.updateResultOrder(
          result.subOrder_order_id,
        );
        if (!orderResultIsUpdated) {
          throw new Error('Failed to update the order result');
        }
        return {
          suborder: result,
          order: orderResultIsUpdated,
        };
      } else {
        throw new Error('Failed to create sub order.');
      }
    } catch (error) {
      throw new Error(error.message);
    }
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
  ): Promise<{ suborder: SubOrderDto; order: OrderDto }> {
    try {
      //update the suborder
      const subOrderIsUpdated = await this.subOrderRepository.update(
        id,
        updateSubOrderDto,
      );
      if (subOrderIsUpdated.affected > 0) {
        //get the updated suborder
        const subOrderUpdated = await this.findOneOrderById(id);
        if (subOrderUpdated) {
          //update the order  with the new suborder (result, status)
          const orderResultIsUpdated =
            await this.orderService.updateResultOrder(
              updateSubOrderDto.subOrder_order_id,
            );
          if (!orderResultIsUpdated) {
            throw new Error('Failed to update the order result');
          }

          console.log('orderResultIsUpdated', orderResultIsUpdated);
          return {
            suborder: subOrderUpdated,
            order: orderResultIsUpdated,
          };
        }
        throw new Error('Failed to update the sub order');
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
