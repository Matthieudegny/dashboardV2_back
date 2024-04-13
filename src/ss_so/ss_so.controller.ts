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

import { SsSoService } from './ss_so.service';
import { Ss_SoDto } from './dto/ss_so.dto';
import { SetupSoDto } from '../setup_so/dto/setupSo.dto';

@ApiTags('Ss_So')
@ApiExtraModels(Ss_SoDto)
@Controller('ss_so')
export class SsSoController {
  constructor(private readonly setupSoService: SsSoService) {}

  @Post('createSsSoList')
  @ApiBody({ type: [Ss_SoDto] })
  create(@Body() createSetupSoDto: Ss_SoDto[]): Promise<SetupSoDto[]> {
    return this.setupSoService.create(createSetupSoDto);
  }

  @Get()
  findAll() {
    return this.setupSoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.setupSoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSetupSoDto: Ss_SoDto) {
    return this.setupSoService.update(+id, updateSetupSoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.setupSoService.remove(+id);
  }
}
