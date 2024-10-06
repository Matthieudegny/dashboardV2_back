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
import { Setup_SubOrder_Reduce_Service } from './setup_SubOrder_Reduce.service';
import { Setup_SubOrder_ReduceDto } from './dto/setup_SubOrder_Reduce.dto';

@ApiTags('Setup_SubOrder_Reduce')
@Controller('setup_SubOrder_Reduce')
export class Setup_SubOrder_Reduce_Controller {
  constructor(private setupSubOrderService: Setup_SubOrder_Reduce_Service) {}

  @Post('createSetupSo')
  create(@Body() createSetupDto: Setup_SubOrder_ReduceDto) {
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
  update(
    @Param('id') id: string,
    @Body() updateSetupDto: Setup_SubOrder_ReduceDto,
  ) {
    return this.setupSubOrderService.update(+id, updateSetupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.setupSubOrderService.remove(+id);
  }
}
