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
import { Setup_SubOrder_Service } from './setup_SubOrder.service';
import { Setup_SubOrderDto } from './dto/setup_SubOrder.dto';

@ApiTags('Setup_SubOrder')
@Controller('setup_SubOrder')
export class Setup_SubOrder_Controller {
  constructor(private setupSubOrderService: Setup_SubOrder_Service) {}

  @Post('createSetupSo')
  create(@Body() createSetupDto: Setup_SubOrderDto) {
    return this.setupSubOrderService.create(createSetupDto);
  }

  @Get()
  findAll() {
    return this.setupSubOrderService.findAll();
  }

  @Get(':idUser')
  findAllSetupSoByIdUser(@Param('idUser') idUser: string) {
    return this.setupSubOrderService.findAllSubOrderSetupSetupByIdUser(+idUser);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.setupSubOrderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSetupDto: Setup_SubOrderDto) {
    return this.setupSubOrderService.update(+id, updateSetupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.setupSubOrderService.remove(+id);
  }
}
