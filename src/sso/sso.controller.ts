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

import { SsoService } from './sso.service';
import { SsoDto } from './dto/sso.dto';
import { SetupSoDto } from '../setupSubOrder/dto/setupSubOrder.dto';

@ApiTags('Ss_So')
@ApiExtraModels(SsoDto)
@Controller('ss_so')
export class SsoController {
  constructor(private readonly ssoService: SsoService) {}

  @Post('createSsSoList')
  @ApiBody({ type: [SsoDto] })
  create(@Body() createSsDto: SsoDto[]): Promise<SetupSoDto[]> {
    return this.ssoService.create(createSsDto);
  }

  @Get()
  findAll() {
    return this.ssoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ssoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSsDto: SsoDto) {
    return this.ssoService.update(+id, updateSsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ssoService.remove(+id);
  }
}
