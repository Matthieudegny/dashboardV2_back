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
import { UpdateResult } from 'typeorm';

@ApiTags('Global_Order')
@ApiExtraModels(GlobalOrderDto, GlobalOrderDto)
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
    return this.globalOrderService.findOneOrderById(+id);
  }

  @ApiTags('Global_Order')
  @Patch('update/:id')
  update(
    @Param('id') id: string,
    @Body() updateGlobalOrderDto: GlobalOrderDto,
  ): Promise<GlobalOrderDto> {
    return this.globalOrderService.update(+id, updateGlobalOrderDto);
  }

  @Delete('deleteOrder/:id')
  remove(@Param('id') id: number) {
    return this.globalOrderService.remove(+id);
  }
}
