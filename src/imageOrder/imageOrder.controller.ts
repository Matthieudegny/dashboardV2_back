import { ApiBody, ApiExtraModels, ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ImageOrderService } from './imageOrder.service';
import { ImageOrderDto } from './dto/imageOrder.dto';

@ApiTags('Image_Go')
@ApiExtraModels(ImageOrderDto)
@Controller('image_go')
export class ImageOrderController {
  constructor(private readonly imageGoService: ImageOrderService) {}

  @Post('create')
  @ApiBody({ type: [ImageOrderDto] })
  create(@Body() imageGoDto: ImageOrderDto): Promise<ImageOrderDto> {
    try {
      return this.imageGoService.create(imageGoDto);
    } catch (error) {
      throw new HttpException(
        'Failed to create image order',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  findAll() {
    return this.imageGoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imageGoService.findOneImageOrderByIdImage(+id);
  }

  @Patch('update')
  update(@Body() updateImageGoDto: ImageOrderDto): Promise<boolean> {
    return this.imageGoService.update(updateImageGoDto);
  }

  @Delete('deleteImageGo/:id')
  remove(@Param('id') id: string): Promise<boolean> {
    return this.imageGoService.remove(+id);
  }
}
