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
import { CategorySetupSubOrderService } from './category_setup_SubOrder.service';
import { CategorySetupSubOrderDto } from './dto/category_setup_SubOrder';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Category_Setup_SubOrder')
@Controller('category-setup-sub-order')
export class CategorySetupSubOrderController {
  constructor(
    private readonly categorySetupSubOrderService: CategorySetupSubOrderService,
  ) {}

  @Post()
  create(@Body() createCategorySetupSubOrderDto: CategorySetupSubOrderDto) {
    try {
      return this.categorySetupSubOrderService.create(
        createCategorySetupSubOrderDto,
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  findAll() {
    try {
      return this.categorySetupSubOrderService.findAll();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('findAllByIdUser/:idUser')
  findAllByIdUser(@Param('idUser') idUser: string) {
    try {
      return this.categorySetupSubOrderService.findAllByIdUser(+idUser);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.categorySetupSubOrderService.findOne(+id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategorySetupSubOrderDto: CategorySetupSubOrderDto,
  ) {
    try {
      return this.categorySetupSubOrderService.update(
        +id,
        updateCategorySetupSubOrderDto,
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.categorySetupSubOrderService.remove(+id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
