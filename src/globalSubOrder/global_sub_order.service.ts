import { Injectable } from '@nestjs/common';

import { SubOrder_Add_Service } from 'src/sub_order/sub_order_add/sub_order_add.service';
import { SubOrder_Reduce_Service } from 'src/sub_order/sub_order_reduce/sub_order_reduce.service';

// model
import { Sub_Order_Reduce_Dto } from 'src/sub_order/sub_order_reduce/dto/sub_order_reduce.dto';
import { Sub_Order_Add_Dto } from 'src/sub_order/sub_order_add/dto/sub_order_add.dto';

@Injectable()
export class Global_SubOrder_Service {
  constructor(
    private readonly subOrderReduceService: SubOrder_Reduce_Service,
    private readonly subOrderAddService: SubOrder_Add_Service,
  ) {}

  async findAllGlobalSubOrderByIdOrder(idOrder: number) {
    // first i get the list of sub order reduce + add by idOrder
    const listSubOrderReduce =
      await this.subOrderReduceService.findAllSubOrderReduceByOrderId(idOrder);
    const listSubOrderAdd =
      await this.subOrderAddService.findAllSubOrderAddByOrderId(idOrder);

    // then i merge the two lists
    const listSubOrder: Array<Sub_Order_Reduce_Dto | Sub_Order_Add_Dto> = [
      ...listSubOrderReduce,
      ...listSubOrderAdd,
    ];

    // then i return the list
    return listSubOrder;
  }
}
