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
import { Image_Suborder_Reduce_Service } from './image_Sub_Order_Reduce.service';
import { Image_Suborder_ReduceDto } from './dto/image_suborder_reduce.dto';

@ApiTags('Image_SubOrder_Reduce')
@ApiExtraModels(Image_Suborder_ReduceDto)
@Controller('image_suborder_reduce')
export class Image_Suborder_Reduce_Controller {
  constructor(
    private readonly Image_Suborder_Reduce_Service: Image_Suborder_Reduce_Service,
  ) {}

  @Post('create')
  @ApiBody({ type: [Image_Suborder_ReduceDto] })
  create(
    @Body() createImageSoDto: Image_Suborder_ReduceDto,
  ): Promise<Image_Suborder_ReduceDto> {
    return this.Image_Suborder_Reduce_Service.create(createImageSoDto);
  }

  @Get()
  findAll() {
    return this.Image_Suborder_Reduce_Service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.Image_Suborder_Reduce_Service.findOne(+id);
  }

  @Patch('update')
  update(@Body() updateImageSoDto: Image_Suborder_ReduceDto): Promise<boolean> {
    return this.Image_Suborder_Reduce_Service.update(updateImageSoDto);
  }

  @Delete('deleteImageGso/:id')
  remove(@Param('id') id: string) {
    return this.Image_Suborder_Reduce_Service.remove(+id);
  }
}
