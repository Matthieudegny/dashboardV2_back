import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SetupSoService } from './setup_so.service';
import { CreateSetupSoDto } from './dto/create-setup_so.dto';
import { UpdateSetupSoDto } from './dto/update-setup_so.dto';

@Controller('setup-so')
export class SetupSoController {
  constructor(private readonly setupSoService: SetupSoService) {}

  @Post()
  create(@Body() createSetupSoDto: CreateSetupSoDto) {
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
  update(@Param('id') id: string, @Body() updateSetupSoDto: UpdateSetupSoDto) {
    return this.setupSoService.update(+id, updateSetupSoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.setupSoService.remove(+id);
  }
}
