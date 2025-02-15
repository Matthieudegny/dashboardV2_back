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
import { SubOrder_Service } from './suborder.service';
import { Suborder_Dto } from './dto/suborder.dto';
import { OrderDto } from 'src/order/dto/order.dto';

@ApiTags('Sub_Order_Reduce')
@Controller('sub-order')
export class SubOrder_Controller {
  constructor(private readonly subOrderService: SubOrder_Service) {}

  @Post()
  @ApiBody({ type: Suborder_Dto })
  async createSubOrder(
    @Body() createSubOrderDto: Suborder_Dto,
  ): Promise<{ suborder: Suborder_Dto; order: OrderDto }> {
    try {
      console.log('createSubOrderDto', createSubOrderDto);
      return await this.subOrderService.createSubOrder(createSubOrderDto);
    } catch (error) {
      // Log the error here if needed
      throw new HttpException(
        'Failed to create suborder',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  findAllSubOrder() {
    return this.subOrderService.findAllSubOrder();
  }

  @Get('allSubOrderByUserId/:userId')
  async findAllSubOrderByIdUser(@Param('userId') userId: string) {
    return this.subOrderService.findAllSubOrderByUserId(+userId);
  }

  @Get(':id')
  findOneSubOrder(@Param('id') id: string) {
    return this.subOrderService.findOneSubOrderById(+id);
  }

  @Patch('update/:id')
  async updateSubOrder(
    @Param('id') id: string,
    @Body() updateSubOrderDto: Suborder_Dto,
  ): Promise<{ suborder: Suborder_Dto; order: OrderDto }> {
    try {
      return await this.subOrderService.updateSubOrder(+id, updateSubOrderDto);
    } catch (error) {
      // Log the error here if needed
      throw new HttpException(
        'Failed to update suborder',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('deleteSubOrder/:id')
  async removeSubOrder(@Param('id') id: string) {
    try {
      return await this.subOrderService.removeSubOrderById(+id);
    } catch (error) {
      throw new HttpException(
        'Failed to delete suborder',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
