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
  async create(
    @Body() createSubOrderDto: Sub_Order_Reduce_Dto,
  ): Promise<{ suborder: Sub_Order_Reduce_Dto; order: OrderDto }> {
    try {
      return await this.subOrderService.create(createSubOrderDto);
    } catch (error) {
      // Log the error here if needed
      throw new HttpException(
        'Failed to create suborder',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  findAll() {
    return this.subOrderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subOrderService.findOneOrderById(+id);
  }

  @ApiTags('Global_SubOrder')
  @Patch('update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateSubOrderDto: Sub_Order_Reduce_Dto,
  ): Promise<{ suborder: Sub_Order_Reduce_Dto; order: OrderDto }> {
    try {
      return await this.subOrderService.update(+id, updateSubOrderDto);
    } catch (error) {
      // Log the error here if needed
      throw new HttpException(
        'Failed to update suborder',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('deleteSubOrder/:id')
  async remove(@Param('id') id: string) {
    try {
      return await this.subOrderService.remove(+id);
    } catch (error) {
      throw new HttpException(
        'Failed to delete suborder',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
