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
import { CategorySetupOrderService } from './category_setup_order.service';
import { CategorySetupOrderDto } from './dto/category_setup_order';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Category_Setup_Order')
@Controller('category-setup-order')
export class CategorySetupOrderController {
  constructor(
    private readonly categorySetupOrderService: CategorySetupOrderService,
  ) {}

  @Post('/create')
  create(@Body() createCategorySetupOrderDto: CategorySetupOrderDto) {
    try {
      return this.categorySetupOrderService.create(createCategorySetupOrderDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/findAll')
  findAll() {
    try {
      return this.categorySetupOrderService.findAll();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/findAllByIdUser/:idUser')
  findAllByIdUser(@Param('idUser') idUser: string) {
    try {
      return this.categorySetupOrderService.findAllByIdUser(+idUser);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/findOne/:id')
  findOne(@Param('id') id: string) {
    try {
      return this.categorySetupOrderService.findOne(+id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch('/update/:id')
  update(
    @Param('id') id: string,
    @Body() updateCategorySetupOrderDto: CategorySetupOrderDto,
  ) {
    try {
      return this.categorySetupOrderService.update(
        +id,
        updateCategorySetupOrderDto,
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    try {
      return this.categorySetupOrderService.remove(+id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
