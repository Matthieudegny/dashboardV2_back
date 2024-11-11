import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { Suborder_Dto } from './dto/suborder.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Suborder } from '../entities/Suborder';
//other dtos used
// import { GlobalSubOrderDto } from '../../main-datas/dto/main-datas.dto';

//services used
import { S_so_Service } from '../s_so/s_so.service';
import { Image_Suborder_Service } from '../image_Suborder/image_Sub_Order.service';
import { Fs_SoService } from '../fs_so/fs_So.service';
import { OrderService } from '../order/order.service';
import { OrderDto } from '../order/dto/order.dto';

@Injectable()
export class SubOrder_Service {
  constructor(
    @InjectRepository(Suborder)
    private subOrderRepository: Repository<Suborder>,
    private readonly s_Sor_Service: S_so_Service,
    private readonly Image_Suborder_Reduce_Service: Image_Suborder_Service,
    private readonly fs_So_Service: Fs_SoService,
    @Inject(forwardRef(() => OrderService))
    private orderService: OrderService,
  ) {}

  async createSubOrder(
    createSubOrderDto: Suborder_Dto,
  ): Promise<{ suborder: Suborder_Dto; order: OrderDto }> {
    try {
      const newSubOrder = this.subOrderRepository.create(createSubOrderDto);
      const result = await this.subOrderRepository.save(newSubOrder);
      if (result) {
        //update the order  with the new suborder (result, status)
        const orderResultIsUpdated =
          await this.orderService.updateOrderAfterSubOrderChanges(
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

  findAllSubOrder() {
    return this.subOrderRepository.find();
  }

  findAllSubOrderByOrderId(orderId: number) {
    return this.subOrderRepository.find({
      where: { subOrder_order_id: orderId },
    });
  }

  findOneSubOrderById(id: number) {
    return this.subOrderRepository.findOneBy({ subOrder_id: id });
  }

  // update the suborder and in the same time update the order (result, status)
  async updateSubOrder(
    id: number,
    updateSubOrderDto: Suborder_Dto,
  ): Promise<{ suborder: Suborder_Dto; order: OrderDto }> {
    try {
      //update the suborder
      const subOrderIsUpdated = await this.subOrderRepository.update(
        id,
        updateSubOrderDto,
      );
      if (subOrderIsUpdated.affected > 0) {
        //get the updated suborder
        const subOrderUpdated = await this.findOneSubOrderById(id);
        if (subOrderUpdated) {
          //update the order  with the new suborder (result, status)
          const orderResultIsUpdated =
            await this.orderService.updateOrderAfterSubOrderChanges(
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

  // remove the suborder and in the same time update the order (result, status)
  async removeSubOrderById(idSubOrder: number) {
    try {
      // find the sub order to delete
      const subOrderToDelete = await this.findOneSubOrderById(idSubOrder);
      if (!subOrderToDelete) {
        throw new Error('Sub order not found');
      }

      const subOrderisDeleted =
        await this.subOrderRepository.delete(idSubOrder);

      if (subOrderisDeleted.affected > 0) {
        //update the order, the fact to remove a sub order can change the status and result of the order
        const orderResultIsUpdated =
          await this.orderService.updateOrderAfterSubOrderChanges(
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

  // async findAndFillSubOrdersByIdGlobalOrderFilledWithDatas(
  //   globalOrderId: number,
  // ) {
  //   let subOrderList = new Array<GlobalSubOrderDto>();

  //   //1. first the list of sub orders
  //   const listSubOrders: Array<Suborder_Reduce_Dto> =
  //     await this.findAllSubOrderReduceByOrderId(globalOrderId);

  //   //2. then i fill each sub order with its datas
  //   for (const subOrder of listSubOrders) {
  //     let subOrderFillWithData: GlobalSubOrderDto = new GlobalSubOrderDto();
  //     //2.1. fill the sub order with its datas
  //     subOrderFillWithData.subOrder = subOrder;
  //     //2.2. fill the setup_so used
  //     subOrderFillWithData.setupSubOrderList =
  //       await this.s_Sor_Service.findAllBySubOrderId(
  //         subOrder.subOrder_reduce_id,
  //       );
  //     //2.3. fill the image_so
  //     subOrderFillWithData.imageSubOrderList =
  //       await this.Image_Suborder_Reduce_Service.findAllBySubOrderId(
  //         subOrder.subOrder_reduce_id,
  //       );
  //     //2.4. fill the failure_so used
  //     subOrderFillWithData.failureSubOrderList =
  //       await this.fs_So_Service.findAllBySubOrderId(
  //         subOrder.subOrder_reduce_id,
  //       );

  //     //2.5. add the sub order to the list
  //     subOrderList.push(subOrderFillWithData);
  //   }

  //   // 3. return the list of sub orders sorted by date
  //   // subOrderList.sort((a, b) => {
  //   //   return a.subOrder.subOrder_closeDate < b.subOrder.subOrder_closeDate
  //   //     ? -1
  //   //     : 1;
  //   // });

  //   return subOrderList;
  // }
}
