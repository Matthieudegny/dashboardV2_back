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
import { Fs_SoService } from './fs_so.service';
import { Fs_So_Dto } from './dto/fs_So.dto';

@ApiTags('Fs_So')
@Controller('fs-so')
export class Fs_So_Controller {
  constructor(private readonly failureSoService: Fs_SoService) {}

  @Post()
  create(@Body() createFailureSoDto: Fs_So_Dto) {
    return this.failureSoService.create(createFailureSoDto);
  }

  @Get()
  findAll() {
    return this.failureSoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.failureSoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFailureSoDto: Fs_So_Dto) {
    return this.failureSoService.update(+id, updateFailureSoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.failureSoService.remove(+id);
  }
}
