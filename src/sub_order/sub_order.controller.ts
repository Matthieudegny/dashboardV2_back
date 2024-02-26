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
import { SubOrderService } from './sub_order.service';
import { SubOrderDto } from './dto/sub_order.dto';

@ApiTags('Sub_Order')
@Controller('sub-order')
export class SubOrderController {
  constructor(private readonly subOrderService: SubOrderService) {}

  @Post()
  create(@Body() createSubOrderDto: SubOrderDto) {
    return this.subOrderService.create(createSubOrderDto);
  }

  @Get()
  findAll() {
    return this.subOrderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subOrderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubOrderDto: SubOrderDto) {
    return this.subOrderService.update(+id, updateSubOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subOrderService.remove(+id);
  }
}
