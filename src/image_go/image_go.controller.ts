import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ImageGoService } from './image_go.service';
import { ImageGoDto } from './dto/image_go.dto';

@Controller('image-go')
export class ImageGoController {
  constructor(private readonly imageGoService: ImageGoService) {}

  @Post()
  create(@Body() createImageGoDto: ImageGoDto) {
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
  update(@Param('id') id: string, @Body() updateImageGoDto: ImageGoDto) {
    return this.imageGoService.update(+id, updateImageGoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imageGoService.remove(+id);
  }
}
