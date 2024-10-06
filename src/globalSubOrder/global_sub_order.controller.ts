import { ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Global_SubOrder_Service } from './global_sub_order.service';

@ApiTags('Global_SubOrder')
@Controller('global-sub-order')
export class Global_SubOrder_Controller {
  constructor(
    private readonly globalSubOrderService: Global_SubOrder_Service,
  ) {}

  @Get()
  findAllGlobalSubOrderByIdOrder(@Param('idOrder') idOrder: number) {
    return this.globalSubOrderService.findAllGlobalSubOrderByIdOrder(idOrder);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.globalSubOrderService.findOne(+id);
  // }
}
