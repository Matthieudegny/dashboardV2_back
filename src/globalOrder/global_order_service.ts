import { Injectable } from '@nestjs/common';
import { OrderService } from 'src/order/order.service';
import { GlobalOrderDto } from './dto/global_order.dto';

import { Fg_GoService } from 'src/fg_go/fg_Go.service';
import { S_o_Service } from 'src/s_o/s_o.service';
import { ImageOrderService } from 'src/imageOrder/imageOrder.service';

@Injectable()
export class Global_Order_Service {
  constructor(
    private readonly orderService: OrderService,
    private readonly Fg_GoService: Fg_GoService,
    private readonly S_o_Service: S_o_Service,
    private readonly imageService: ImageOrderService,
  ) {}

  async findAllGlobalOrderByIdUser(idUser: number) {
    // first i get the list of order by idUser
    const listOrder = await this.orderService.findAllOrderByIdUser(idUser);

    // then i sort the list of order by date
    listOrder.sort((a, b) => {
      return a.order_openDate < b.order_openDate ? 1 : -1;
    });

    // for each order, i create a global order object type GlobalOrderDto
    // then i fill it with the order and its datas (failure, setup, image)
    const listGlobalOrder: Array<GlobalOrderDto> = [];

    for (const order of listOrder) {
      const globalOrder = new GlobalOrderDto();
      globalOrder.order = order;
      globalOrder.failureOrderList =
        await this.Fg_GoService.findAllByGlobalOrderId(order.order_id);
      globalOrder.setupOrderList = await this.S_o_Service.findAllSetupByOrderId(
        order.order_id,
      );
      globalOrder.imageOrderList =
        await this.imageService.findAllImagesByOrderId(order.order_id);
    }

    // then i return the list of global order
    return listGlobalOrder;
  }
}
