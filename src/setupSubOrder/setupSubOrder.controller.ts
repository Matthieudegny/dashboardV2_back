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
import { SetupSubOrderService } from './setupSubOrder.service';
import { SetupSoDto } from './dto/setupSubOrder.dto';

@ApiTags('Setup_So')
@Controller('setup_so')
export class SetupSubOrderController {
  constructor(private setupSubOrderService: SetupSubOrderService) {}

  @Post('createSetupSo')
  create(@Body() createSetupDto: SetupSoDto) {
    return this.setupSubOrderService.create(createSetupDto);
  }

  @Get()
  findAll() {
    return this.setupSubOrderService.findAll();
  }

  @Get(':idUser')
  findAllSetupSoByIdUser(@Param('idUser') idUser: string) {
    return this.setupSubOrderService.findAllSetupSoByIdUser(+idUser);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.setupSubOrderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSetupDto: SetupSoDto) {
    return this.setupSubOrderService.update(+id, updateSetupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.setupSubOrderService.remove(+id);
  }
}
