import { ApiTags, ApiBody } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { SubOrder_Reduce_Service } from './sub_order_reduce.service';
import { Sub_Order_Reduce_Dto } from './dto/sub_order_reduce.dto';
import { OrderDto } from 'src/order/dto/order.dto';

@ApiTags('Sub_Order_Reduce')
@Controller('sub-order-reduce')
export class SubOrder_Reduce_Controller {
  constructor(private readonly subOrderService: SubOrder_Reduce_Service) {}

  @Post()
  @ApiBody({ type: Sub_Order_Reduce_Dto })
  async createSubOrderReduce(
    @Body() createSubOrderDto: Sub_Order_Reduce_Dto,
  ): Promise<{ suborder: Sub_Order_Reduce_Dto; order: OrderDto }> {
    try {
      return await this.subOrderService.createSubOrderReduce(createSubOrderDto);
    } catch (error) {
      // Log the error here if needed
      throw new HttpException(
        'Failed to create suborder',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  findAllSubOrderReduce() {
    return this.subOrderService.findAllSubOrderReduce();
  }

  @Get(':id')
  findOneSubOrderReduce(@Param('id') id: string) {
    return this.subOrderService.findOneSubOrderReduceById(+id);
  }

  @Patch('update/:id')
  async updateSubOrderReduce(
    @Param('id') id: string,
    @Body() updateSubOrderDto: Sub_Order_Reduce_Dto,
  ): Promise<{ suborder: Sub_Order_Reduce_Dto; order: OrderDto }> {
    try {
      return await this.subOrderService.updateSubOrderReduce(
        +id,
        updateSubOrderDto,
      );
    } catch (error) {
      // Log the error here if needed
      throw new HttpException(
        'Failed to update suborder',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('deleteSubOrder/:id')
  async removeSubOrderReduce(@Param('id') id: string) {
    try {
      return await this.subOrderService.removeSubOrderReduceById(+id);
    } catch (error) {
      throw new HttpException(
        'Failed to delete suborder',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
