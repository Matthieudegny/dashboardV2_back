import { ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { Global_Order_Service } from './global_order_service';

@ApiTags('Global_Order')
@Controller('global-order')
export class Global_Order_Controller {
  constructor(private readonly globalOrderService: Global_Order_Service) {}

  @Get('getAllGlobalOrderByUserId')
  async findAllGlobalOrderByIdUser(@Param('idUser') idUser: number) {
    try {
      return await this.globalOrderService.findAllGlobalOrderByIdUserPlusListSubOrder(
        idUser,
      );
    } catch (error) {
      throw new HttpException(
        'Failed to get global order list',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
