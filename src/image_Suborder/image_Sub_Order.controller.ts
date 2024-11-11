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
import { Image_Suborder_Service } from './image_Sub_Order.service';
import { Image_SuborderDto } from './dto/image_suborder.dto';

@ApiTags('Image_SubOrder')
@ApiExtraModels(Image_SuborderDto)
@Controller('image_suborder')
export class Image_Suborder_Controller {
  constructor(
    private readonly Image_Suborder_Service: Image_Suborder_Service,
  ) {}

  @Post('create')
  @ApiBody({ type: [Image_SuborderDto] })
  create(
    @Body() createImageSoDto: Image_SuborderDto,
  ): Promise<Image_SuborderDto> {
    return this.Image_Suborder_Service.create(createImageSoDto);
  }

  @Get()
  findAll() {
    return this.Image_Suborder_Service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.Image_Suborder_Service.findOne(+id);
  }

  @Patch('update')
  update(@Body() updateImageSoDto: Image_SuborderDto): Promise<boolean> {
    return this.Image_Suborder_Service.update(updateImageSoDto);
  }

  @Delete('deleteImageGso/:id')
  remove(@Param('id') id: string) {
    return this.Image_Suborder_Service.remove(+id);
  }
}
