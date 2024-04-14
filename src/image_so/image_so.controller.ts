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
import { ImageSoService } from './image_so.service';
import { ImageSoDto } from './dto/image_so.dto';

@ApiTags('Image_So')
@ApiExtraModels(ImageSoDto)
@Controller('image_so')
export class ImageSoController {
  constructor(private readonly imageSoService: ImageSoService) {}

  @Post('create')
  @ApiBody({ type: [ImageSoDto] })
  create(@Body() createImageSoDto: ImageSoDto): Promise<ImageSoDto> {
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
  update(@Param('id') id: string, @Body() updateImageSoDto: ImageSoDto) {
    return this.imageSoService.update(+id, updateImageSoDto);
  }

  @Delete('deleteImageGso/:id')
  remove(@Param('id') id: string) {
    return this.imageSoService.remove(+id);
  }
}
