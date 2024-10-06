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
import { Image_Suborder_Add_Service } from './image_Sub_Order_Add.service';
import { Image_Suborder_AddDto } from './dto/image_suborder_add.dto';

@ApiTags('Image_SubOrder_Add')
@ApiExtraModels(Image_Suborder_AddDto)
@Controller('image_suborder_add')
export class Image_Suborder_Add_Controller {
  constructor(
    private readonly Image_Suborder_Add_Service: Image_Suborder_Add_Service,
  ) {}

  @Post('create')
  @ApiBody({ type: [Image_Suborder_AddDto] })
  create(
    @Body() createImageSoDto: Image_Suborder_AddDto,
  ): Promise<Image_Suborder_AddDto> {
    return this.Image_Suborder_Add_Service.create(createImageSoDto);
  }

  @Get()
  findAll() {
    return this.Image_Suborder_Add_Service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.Image_Suborder_Add_Service.findOne(+id);
  }

  @Patch('update')
  update(@Body() updateImageSoDto: Image_Suborder_AddDto): Promise<boolean> {
    return this.Image_Suborder_Add_Service.update(updateImageSoDto);
  }

  @Delete('deleteImageGso/:id')
  remove(@Param('id') id: string) {
    return this.Image_Suborder_Add_Service.remove(+id);
  }
}
