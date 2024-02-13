import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FailureSoService } from './failure_so.service';
import { CreateFailureSoDto } from './dto/create-failure_so.dto';
import { UpdateFailureSoDto } from './dto/update-failure_so.dto';

@Controller('failure-so')
export class FailureSoController {
  constructor(private readonly failureSoService: FailureSoService) {}

  @Post()
  create(@Body() createFailureSoDto: CreateFailureSoDto) {
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
  update(@Param('id') id: string, @Body() updateFailureSoDto: UpdateFailureSoDto) {
    return this.failureSoService.update(+id, updateFailureSoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.failureSoService.remove(+id);
  }
}
