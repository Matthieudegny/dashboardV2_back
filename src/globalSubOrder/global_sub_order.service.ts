import { Injectable } from '@nestjs/common';

import { SubOrder_Service } from 'src/sub_order/suborder.service';

// model
import { Suborder_Dto } from 'src/sub_order/dto/suborder.dto';
import { GlobalSubOrderDto } from './dto/global_suborder.dto';

// services used
import { Fs_SoService } from 'src/fs_so/fs_So.service';
import { Image_Suborder_Service } from 'src/image_Suborder/image_Sub_Order.service';

@Injectable()
export class Global_SubOrder_Service {
  constructor(
    private readonly subOrderService: SubOrder_Service,
    private readonly failureSoService: Fs_SoService,
    private readonly imageSuborderService: Image_Suborder_Service,
  ) {}

  async findAllGlobalSubOrderByIdOrder(idOrder: number) {
    // first i get the list of sub order reduce + add by idOrder
    const listSubOrder =
      await this.subOrderService.findAllSubOrderByOrderId(idOrder);

    if (listSubOrder.length === 0) {
      return [];
    }

    // sort the list by date (suborder date property can be openDate or closeDate)
    listSubOrder.sort((a, b) => {
      return a.subOrder_openDate < b.subOrder_openDate ? 1 : -1;
    });

    // for each suborder, i create a globalsuborder object type GlobalSubOrderDto
    // and i fill it with the suborder and its datas (failure, setup, image)
    const listGlobalSubOrder: Array<GlobalSubOrderDto> = [];

    for (const subOrder of listSubOrder) {
      let globalSubOrder: GlobalSubOrderDto;

      globalSubOrder = await this.FillGlobalSubOrder(subOrder);

      listGlobalSubOrder.push(globalSubOrder);
    }

    // then i return the list
    return listGlobalSubOrder;
  }

  async FillGlobalSubOrder(subOrder: Suborder_Dto) {
    const globalSubOrder: GlobalSubOrderDto = {
      subOrder: subOrder,
      failureSubOrderList: [],
      imageSubOrderList: [],
    };

    globalSubOrder.failureSubOrderList =
      await this.failureSoService.findAllBySubOrderId(subOrder.subOrder_id);
    globalSubOrder.imageSubOrderList =
      await this.imageSuborderService.findAllBySubOrderId(subOrder.subOrder_id);

    return globalSubOrder;
  }
}
