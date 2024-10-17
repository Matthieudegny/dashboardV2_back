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
import { ApiBody, ApiExtraModels } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { OrderDto } from './dto/order.dto';

@ApiTags('Order')
@ApiExtraModels(OrderDto, OrderDto)
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiBody({ type: OrderDto })
  create(@Body() createOrderDto: OrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOneOrderById(+id);
  }

  @ApiTags('Order')
  @Patch('update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateOrderDto: OrderDto,
  ): Promise<OrderDto> {
    const response = await this.orderService.update(+id, updateOrderDto);
    try {
      return response;
    } catch (error) {
      console.log('error', error);
      throw new Error('Failed to update global order.');
    }
  }

  @Delete('deleteOrder/:id')
  remove(@Param('id') id: number) {
    return this.orderService.remove(+id);
  }
}
