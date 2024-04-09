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
import { ImageGoService } from './image_go.service';
import { ImageGoDto } from './dto/image_go.dto';

@ApiTags('Image_Go')
@ApiExtraModels(ImageGoDto)
@Controller('image_go')
export class ImageGoController {
  constructor(private readonly imageGoService: ImageGoService) {}

  @Post('create')
  @ApiBody({ type: [ImageGoDto] })
  create(@Body() imageGoDto: ImageGoDto): Promise<ImageGoDto> {
    return this.imageGoService.create(imageGoDto);
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

  @Delete('deleteImageGo/:id')
  remove(@Param('id') id: string): Promise<boolean> {
    return this.imageGoService.remove(+id);
  }
}
