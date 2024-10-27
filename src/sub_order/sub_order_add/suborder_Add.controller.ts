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
import { SubOrder_Add_Service } from './suborder_Add.service';
import { Sub_Order_Add_Dto } from './dto/suborder_Add.dto';
import { OrderDto } from 'src/order/dto/order.dto';

@ApiTags('Sub_Order_Add')
@Controller('sub-order-add')
export class SubOrder_Add_Controller {
  constructor(private readonly subOrderService: SubOrder_Add_Service) {}

  @Post()
  @ApiBody({ type: Sub_Order_Add_Dto })
  async createSubOrderAdd(
    @Body() createSubOrderDto: Sub_Order_Add_Dto,
  ): Promise<{ suborder: Sub_Order_Add_Dto; order: OrderDto }> {
    try {
      return await this.subOrderService.createSubOrderAdd(createSubOrderDto);
    } catch (error) {
      throw new HttpException(
        'Failed to create suborder',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  findAllSubOrderAdd() {
    return this.subOrderService.findAllSubOrderAdd();
  }

  @Get(':id')
  findOneSubOrderAdd(@Param('id') id: string) {
    return this.subOrderService.findOneSubOrderAddOrderById(+id);
  }

  @Patch('update/:id')
  async updateSubOrderAdd(
    @Param('id') id: string,
    @Body() updateSubOrderDto: Sub_Order_Add_Dto,
  ): Promise<{ suborder: Sub_Order_Add_Dto; order: OrderDto }> {
    try {
      return await this.subOrderService.updateSubOrderAdd(
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

  @Delete('deleteSubOrderAdd/:id')
  async removeSubOrderAdd(@Param('id') id: string) {
    try {
      return await this.subOrderService.removeSubOrderAddById(+id);
    } catch (error) {
      throw new HttpException(
        'Failed to delete suborder',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
