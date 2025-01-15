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
import { S_o_Service } from './s_o.service';
import { S_o_Dto } from './dto/s_o.dto';
import { SetupOrderDto } from '../setupOrder/dto/setup_go.dto';

@ApiTags('So')
@ApiExtraModels(S_o_Dto)
@Controller('so')
export class S_o_Controller {
  constructor(private readonly soService: S_o_Service) {}

  //update list association table Setup_Order - Category_Setup_Order
  @Post('updateListSo')
  @ApiBody({ type: [S_o_Dto] })
  updateAll(@Body() createSgGosDto: S_o_Dto[]): Promise<SetupOrderDto[]> {
    return this.soService.updateListSo(createSgGosDto);
  }

  @Get()
  findAll() {
    return this.soService.findAll();
  }

  @Get(':id')
  findAllByGlobalOrderId(@Param('id') id: string) {
    return this.soService.findAllSetupByOrderId(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.soService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSetupGoDto: S_o_Dto) {
    return this.soService.update(+id, updateSetupGoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.soService.remove(+id);
  }

  @Delete('deleteAll/:id')
  removeAllByGlobalOrderId(@Param('id') id: string): Promise<boolean> {
    return this.soService.removeAllByOrderId(+id);
  }
}
