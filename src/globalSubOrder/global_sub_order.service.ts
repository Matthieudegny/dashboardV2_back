import { Injectable } from '@nestjs/common';

import { SubOrder_Add_Service } from 'src/sub_order/sub_order_add/suborder_Add.service';
import { SubOrder_Reduce_Service } from 'src/sub_order/sub_order_reduce/suborder_Reduce.service';

// model
import { Suborder_Reduce_Dto } from 'src/sub_order/sub_order_reduce/dto/suborder_Reduce.dto';
import { Sub_Order_Add_Dto } from 'src/sub_order/sub_order_add/dto/suborder_Add.dto';
import {
  GlobalSubOrderAddDto,
  GlobalSubOrderReducedDto,
} from './dto/global_suborder.dto';

// services used
import { Fs_SoService } from 'src/fs_so/fs_So.service';
import { S_sor_Service } from 'src/s_sor/s_sor.service';
import { Image_Suborder_Add_Service } from 'src/image_Suborder_Add/image_Sub_Order_Add.service';
import { Image_Suborder_Reduce_Service } from 'src/image_Suborder_Reduce/image_Sub_Order_Reduce.service';
import { S_Soa_Service } from 'src/s_soa/s_soa.service';

// utils
import { getDate } from './utils/getDate';
import { isSuborderAdd } from './utils/isSubOrderAdd';

@Injectable()
export class Global_SubOrder_Service {
  constructor(
    private readonly subOrderReduceService: SubOrder_Reduce_Service,
    private readonly subOrderAddService: SubOrder_Add_Service,
    private readonly failureSoService: Fs_SoService,
    private readonly s_Soa_Service: S_Soa_Service,
    private readonly s_Sor_Service: S_sor_Service,
    private readonly imageSuborderAddService: Image_Suborder_Add_Service,
    private readonly imageSuborderReduceService: Image_Suborder_Reduce_Service,
  ) {}

  async findAllGlobalSubOrderByIdOrder(idOrder: number) {
    // first i get the list of sub order reduce + add by idOrder
    const listSubOrderReduce =
      await this.subOrderReduceService.findAllSubOrderReduceByOrderId(idOrder);
    const listSubOrderAdd =
      await this.subOrderAddService.findAllSubOrderAddByOrderId(idOrder);

    // then i merge the two lists
    const listSubOrder: Array<Suborder_Reduce_Dto | Sub_Order_Add_Dto> = [
      ...listSubOrderReduce,
      ...listSubOrderAdd,
    ];

    // sort the list by date (suborder date property can be openDate or closeDate)
    listSubOrder.sort((a, b) => {
      if (getDate(a) && getDate(b)) {
        return getDate(a) < getDate(b) ? 1 : -1;
      } else if (getDate(a)) {
        return 1;
      } else {
        return -1;
      }
    });

    // for each suborder, i create a globalsuborder object type GlobalSubOrderReducedDto or GlobalSubOrderAddDto
    // and i fill it with the suborder and its datas (failure, setup, image)
    const listGlobalSubOrder: Array<
      GlobalSubOrderReducedDto | GlobalSubOrderAddDto
    > = [];

    for (const subOrder of listSubOrder) {
      let globalSubOrder: GlobalSubOrderReducedDto | GlobalSubOrderAddDto;

      if (isSuborderAdd(subOrder)) {
        globalSubOrder = await this.FillGlobalSubOrderAdd(subOrder);
      } else {
        globalSubOrder = await this.FillGlobalSubOrderReduce(subOrder);
      }

      listGlobalSubOrder.push(globalSubOrder);
    }

    // then i return the list
    return listGlobalSubOrder;
  }

  async FillGlobalSubOrderAdd(subOrder: Sub_Order_Add_Dto) {
    const globalSubOrder: GlobalSubOrderAddDto = {
      subOrder: subOrder,
      failureSubOrderList: [],
      setupSubOrderList: [],
      imageSubOrderList: [],
    };

    globalSubOrder.failureSubOrderList =
      await this.failureSoService.findAllBySubOrderId(subOrder.subOrder_add_id);
    globalSubOrder.setupSubOrderList =
      await this.s_Soa_Service.findAllSetupAddBySubOrderId(
        subOrder.subOrder_add_id,
      );
    globalSubOrder.imageSubOrderList =
      await this.imageSuborderAddService.findAllBySubOrderId(
        subOrder.subOrder_add_id,
      );

    return globalSubOrder;
  }

  async FillGlobalSubOrderReduce(subOrder: Suborder_Reduce_Dto) {
    const globalSubOrder: GlobalSubOrderReducedDto = {
      subOrder: subOrder,
      failureSubOrderList: [],
      setupSubOrderList: [],
      imageSubOrderList: [],
    };

    globalSubOrder.failureSubOrderList =
      await this.failureSoService.findAllBySubOrderId(
        subOrder.subOrder_reduce_id,
      );
    globalSubOrder.setupSubOrderList =
      await this.s_Sor_Service.findAllSetupreduceBySubOrderId(
        subOrder.subOrder_reduce_id,
      );
    globalSubOrder.imageSubOrderList =
      await this.imageSuborderReduceService.findAllBySubOrderId(
        subOrder.subOrder_reduce_id,
      );

    return globalSubOrder;
  }
}
