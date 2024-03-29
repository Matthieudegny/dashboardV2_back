import { ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiBody, ApiExtraModels } from '@nestjs/swagger';
import { GlobalOrderService } from './global_order.service';
import { GlobalOrderDto } from './dto/global_order.dto';
import { GlobalOrderFillWithDatasDto } from '../main-datas/dto/main-datas.dto';

@ApiTags('Global_Order')
@ApiExtraModels(GlobalOrderFillWithDatasDto, GlobalOrderDto)
@Controller('global-order')
export class GlobalOrderController {
  constructor(private readonly globalOrderService: GlobalOrderService) {}

  @Post()
  @ApiBody({ type: GlobalOrderDto })
  create(@Body() createGlobalOrderDto: GlobalOrderDto) {
    return this.globalOrderService.create(createGlobalOrderDto);
  }

  // @Post('createGlobalOrderWithDatas')
  // @ApiBody({ type: GlobalOrderFillWithDatasDto })
  // createGlobalOrderWithDatas(
  //   @Body() createGlobalOrderWithDatasDto: GlobalOrderFillWithDatasDto,
  // ) {
  //   return this.globalOrderService.createGlobalOrderWithDatas(
  //     createGlobalOrderWithDatasDto,
  //   );
  // }

  @Get()
  findAll() {
    return this.globalOrderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.globalOrderService.findOne(+id);
  }

  @ApiTags('Global_Order')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGlobalOrderDto: GlobalOrderDto,
  ) {
    return this.globalOrderService.update(+id, updateGlobalOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.globalOrderService.remove(+id);
  }
}
