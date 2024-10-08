import { ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { Global_SubOrder_Service } from './global_sub_order.service';

@ApiTags('Global_SubOrder')
@Controller('global-sub-order')
export class Global_SubOrder_Controller {
  constructor(
    private readonly globalSubOrderService: Global_SubOrder_Service,
  ) {}

  @Get('getAllGlobalSubOrderByOrderId')
  async findAllGlobalSubOrderByIdOrder(@Param('idOrder') idOrder: number) {
    try {
      return await this.globalSubOrderService.findAllGlobalSubOrderByIdOrder(
        idOrder,
      );
    } catch (error) {
      throw new HttpException(
        'Failed to get global sub order',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
