import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ImageGoService } from './image_go.service';
import { CreateImageGoDto } from './dto/create-image_go.dto';
import { UpdateImageGoDto } from './dto/update-image_go.dto';

@Controller('image-go')
export class ImageGoController {
  constructor(private readonly imageGoService: ImageGoService) {}

  @Post()
  create(@Body() createImageGoDto: CreateImageGoDto) {
    return this.imageGoService.create(createImageGoDto);
  }

  @Get()
  findAll() {
    return this.imageGoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imageGoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImageGoDto: UpdateImageGoDto) {
    return this.imageGoService.update(+id, updateImageGoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imageGoService.remove(+id);
  }
}
