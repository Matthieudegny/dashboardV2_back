import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ImageSoService } from './image_so.service';
import { CreateImageSoDto } from './dto/create-image_so.dto';
import { UpdateImageSoDto } from './dto/update-image_so.dto';

@Controller('image-so')
export class ImageSoController {
  constructor(private readonly imageSoService: ImageSoService) {}

  @Post()
  create(@Body() createImageSoDto: CreateImageSoDto) {
    return this.imageSoService.create(createImageSoDto);
  }

  @Get()
  findAll() {
    return this.imageSoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imageSoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImageSoDto: UpdateImageSoDto) {
    return this.imageSoService.update(+id, updateImageSoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imageSoService.remove(+id);
  }
}
