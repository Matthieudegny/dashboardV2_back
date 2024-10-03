import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GlobalOrderService } from './global_order.service';
import { CreateGlobalOrderDto } from './dto/create-global_order.dto';
import { UpdateGlobalOrderDto } from './dto/update-global_order.dto';

@Controller('global-order')
export class GlobalOrderController {
  constructor(private readonly globalOrderService: GlobalOrderService) {}

  @Post()
  create(@Body() createGlobalOrderDto: CreateGlobalOrderDto) {
    return this.globalOrderService.create(createGlobalOrderDto);
  }

  @Get()
  findAll() {
    return this.globalOrderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.globalOrderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGlobalOrderDto: UpdateGlobalOrderDto) {
    return this.globalOrderService.update(+id, updateGlobalOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.globalOrderService.remove(+id);
  }
}
