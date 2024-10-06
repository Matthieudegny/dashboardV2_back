import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { Sub_Order_Add_Dto } from './dto/sub_order_add.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sub_Order_Add } from '../../entities/Sub_Order_Add';
//other dtos used
import { GlobalSubOrderDto } from '../../main-datas/dto/main-datas.dto';

//services used
import { SsoService } from '../../sso/sso.service';
import { ImageSubOrderService } from '../../imageSubOrder/imageSubOrder.service';
import { Fs_SoService } from '../../fs_so/fs_So.service';
import { OrderService } from '../../order/order.service';
import { OrderDto } from '../../order/dto/order.dto';

@Injectable()
export class SubOrder_Add_Service {
  constructor(
    @InjectRepository(Sub_Order_Add)
    private subOrderRepository: Repository<Sub_Order_Add>,
    private readonly ssSoService: SsoService,
    private readonly imageSoService: ImageSubOrderService,
    private readonly fs_So_Service: Fs_SoService,
    @Inject(forwardRef(() => OrderService))
    private orderService: OrderService,
  ) {}

  async createSubOrderAdd(
    createSubOrderDto: Sub_Order_Add_Dto,
  ): Promise<{ suborder: Sub_Order_Add_Dto; order: OrderDto }> {
    try {
      const newSubOrder = this.subOrderRepository.create(createSubOrderDto);
      const result = await this.subOrderRepository.save(newSubOrder);
      if (result) {
        //update the order  with the new suborder (result, status)
        const orderResultIsUpdated = await this.orderService.updateOrder(
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

  findAllSubOrderAdd() {
    return this.subOrderRepository.find();
  }

  findAllSubOrderAddByOrderId(orderId: number) {
    return this.subOrderRepository.find({
      where: { subOrder_order_id: orderId },
    });
  }

  findOneSubOrderAddOrderById(id: number) {
    return this.subOrderRepository.findOneBy({ subOrder_id: id });
  }

  // update the suborderAdd and in the same time update the order (result, status)
  async updateSubOrderAdd(
    id: number,
    updateSubOrderDto: Sub_Order_Add_Dto,
  ): Promise<{ suborder: Sub_Order_Add_Dto; order: OrderDto }> {
    try {
      //update the suborder
      const subOrderIsUpdated = await this.subOrderRepository.update(
        id,
        updateSubOrderDto,
      );
      if (subOrderIsUpdated.affected > 0) {
        //get the updated suborder
        const subOrderUpdated = await this.findOneSubOrderAddOrderById(id);
        if (subOrderUpdated) {
          //update the order  with the new suborder (result, status)
          const orderResultIsUpdated = await this.orderService.updateOrder(
            updateSubOrderDto.subOrder_order_id,
          );
          if (!orderResultIsUpdated) {
            throw new Error('Failed to update the order result');
          }

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

  // remove the suborderAdd and in the same time update the order (result, status)
  async removeSubOrderAddById(idSubOrder: number) {
    try {
      // find the sub order to delete
      const subOrderToDelete =
        await this.findOneSubOrderAddOrderById(idSubOrder);
      if (!subOrderToDelete) {
        throw new Error('Sub order not found');
      }

      const subOrderisDeleted =
        await this.subOrderRepository.delete(idSubOrder);

      if (subOrderisDeleted.affected > 0) {
        //update the order, the fact to remove a sub order can change the status and result of the order
        const orderResultIsUpdated = await this.orderService.updateOrder(
          subOrderToDelete.subOrder_order_id,
        );

        if (!orderResultIsUpdated) {
          throw new Error('Failed to update the order result');
        }
      }
      return subOrderisDeleted;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // DEPLACER DANS UN MODULE DEDIE
  async findAndFillSubOrdersByIdGlobalOrderFilledWithDatas(
    globalOrderId: number,
  ) {
    let subOrderList = new Array<GlobalSubOrderDto>();

    //1. first the list of sub orders
    const listSubOrders: Array<Sub_Order_Add_Dto> =
      await this.findAllSubOrderAddByOrderId(globalOrderId);

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

    // 3. return the list of sub orders sorted by date
    // subOrderList.sort((a, b) => {
    //   return a.subOrder.subOrder_closeDate < b.subOrder.subOrder_closeDate
    //     ? -1
    //     : 1;
    // });

    return subOrderList;
  }
}
