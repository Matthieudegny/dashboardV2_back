import { ApiTags } from '@nestjs/swagger';
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
import { SubOrderService } from './sub_order.service';
import { SubOrderDto } from './dto/sub_order.dto';
import { OrderDto } from 'src/order/dto/order.dto';

@ApiTags('Sub_Order')
@Controller('sub-order')
export class SubOrderController {
  constructor(private readonly subOrderService: SubOrderService) {}

  @Post()
  async create(
    @Body() createSubOrderDto: SubOrderDto,
  ): Promise<{ suborder: SubOrderDto; order: OrderDto }> {
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
    @Body() updateSubOrderDto: SubOrderDto,
  ): Promise<{ suborder: SubOrderDto; order: OrderDto }> {
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
