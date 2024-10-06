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

import { S_sor_Service } from './s_sor.service';
import { S_sor_Dto } from './dto/s_sor.dto';
import { Setup_SubOrder_ReduceDto } from '../setup_SubOrder_Reduce/dto/setup_SubOrder_Reduce.dto';

@ApiTags('S_sor')
@ApiExtraModels(S_sor_Dto)
@Controller('s_sor')
export class S_sor_Controller {
  constructor(private readonly ssorService: S_sor_Service) {}

  @Post('createSsorList')
  @ApiBody({ type: [S_sor_Dto] })
  create(
    @Body() createSsDto: S_sor_Dto[],
  ): Promise<Setup_SubOrder_ReduceDto[]> {
    return this.ssorService.create(createSsDto);
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
  update(@Param('id') id: string, @Body() updateSsDto: S_sor_Dto) {
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
