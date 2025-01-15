import { ApiBody, ApiExtraModels, ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { S_so_Service } from './s_so.service';
import { S_so_Dto } from './dto/s_so.dto';
import { Setup_SubOrderDto } from '../setup_SubOrder/dto/setup_SubOrder.dto';

@ApiTags('S_so')
@ApiExtraModels(S_so_Dto)
@Controller('s_so')
export class S_so_Controller {
  constructor(private readonly ssorService: S_so_Service) {}

  @Post('updateListSso')
  @ApiBody({ type: [S_so_Dto] })
  updateAll(@Body() createSsDto: S_so_Dto[]): Promise<Setup_SubOrderDto[]> {
    return this.ssorService.updateListSso(createSsDto);
  }

  @Get()
  findAll() {
    return this.ssorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ssorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSsDto: S_so_Dto) {
    return this.ssorService.update(+id, updateSsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ssorService.remove(+id);
  }

  @Delete('deleteAll/:id')
  removeAllByGlobalOrderId(@Param('id') id: string): Promise<boolean> {
    return this.ssorService.removeAllBySubOrderId(+id);
  }
}
