import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MainDatasService } from './main-datas.service';
import { CreateMainDataDto } from './dto/create-main-data.dto';
import { UpdateMainDataDto } from './dto/update-main-data.dto';

@Controller('main-datas')
export class MainDatasController {
  constructor(private readonly mainDatasService: MainDatasService) {}

  @Post()
  create(@Body() createMainDataDto: CreateMainDataDto) {
    return this.mainDatasService.create(createMainDataDto);
  }

  @Get()
  findAll() {
    return this.mainDatasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mainDatasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMainDataDto: UpdateMainDataDto) {
    return this.mainDatasService.update(+id, updateMainDataDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mainDatasService.remove(+id);
  }
}
