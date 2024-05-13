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
import { ImageSubOrderService } from './imageSubOrder.service';
import { ImageSubOrderDto } from './dto/image_so.dto';

@ApiTags('Image_So')
@ApiExtraModels(ImageSubOrderDto)
@Controller('image_so')
export class ImageSubOrderController {
  constructor(private readonly imageSoService: ImageSubOrderService) {}

  @Post('create')
  @ApiBody({ type: [ImageSubOrderDto] })
  create(
    @Body() createImageSoDto: ImageSubOrderDto,
  ): Promise<ImageSubOrderDto> {
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

  @Patch('update')
  update(@Body() updateImageSoDto: ImageSubOrderDto): Promise<boolean> {
    return this.imageSoService.update(updateImageSoDto);
  }

  @Delete('deleteImageGso/:id')
  remove(@Param('id') id: string) {
    return this.imageSoService.remove(+id);
  }
}
