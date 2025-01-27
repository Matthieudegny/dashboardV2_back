import { Injectable } from '@nestjs/common';
import { OrderService } from 'src/order/order.service';
import { GlobalOrderDto } from './dto/global_order.dto';

import { Fg_GoService } from 'src/fg_go/fg_Go.service';
import { S_o_Service } from 'src/s_o/s_o.service';
import { ImageOrderService } from 'src/imageOrder/imageOrder.service';
import { Global_SubOrder_Service } from 'src/globalSubOrder/global_sub_order.service';
import { Suborder_Dto } from 'src/sub_order/dto/suborder.dto';
@Injectable()
export class Global_Order_Service {
  constructor(
    private readonly orderService: OrderService,
    private readonly Fg_GoService: Fg_GoService,
    private readonly S_o_Service: S_o_Service,
    private readonly imageService: ImageOrderService,
    private readonly globalSubOrderService: Global_SubOrder_Service,
  ) {}

  async findAllGlobalOrderByIdUserPlusListSubOrder(idUser: number) {
    // first i get the list of order by idUser
    const listOrder = await this.orderService.findAllOrderByIdUser(idUser);

    // then i sort the list of order by date
    listOrder.sort((a, b) => {
      return a.order_openDate < b.order_openDate ? 1 : -1;
    });

    // for each order, i create a global order object type GlobalOrderDto
    // then i fill it with the order and its datas (failure, setup, image)
    const listGlobalOrder: Array<GlobalOrderDto> = [];
    const listSubOrder: Array<Suborder_Dto> = [];

    for (const order of listOrder) {
      const globalOrder = new GlobalOrderDto();
      globalOrder.order = order;
      // Failures
      globalOrder.failureOrderList =
        await this.Fg_GoService.findAllByGlobalOrderId(order.order_id);
      // Setups
      globalOrder.setupOrderList = await this.S_o_Service.findAllSetupByOrderId(
        order.order_id,
      );
      // Images
      globalOrder.imageOrderList =
        await this.imageService.findAllImagesByOrderId(order.order_id);
      // Suborders
      const listGlobalSubOrderByOrderId =
        await this.globalSubOrderService.findAllGlobalSubOrderByIdOrder(
          order.order_id,
        );
      globalOrder.globalSubOrderList = listGlobalSubOrderByOrderId;
      // for each Globalsuborder, i get the suborder
      if (listGlobalSubOrderByOrderId.length > 0) {
        for (const globalSubOrder of listGlobalSubOrderByOrderId) {
          listSubOrder.push(globalSubOrder.subOrder);
        }
      }

      listGlobalOrder.push(globalOrder);
    }

    // sort list by the most recent to the oldest
    listGlobalOrder.sort((a, b) => {
      return a.order.order_openDate < b.order.order_openDate ? 1 : -1;
    });

    // then i return the list of global order
    return { listGlobalOrder, listSubOrder };
  }
}
