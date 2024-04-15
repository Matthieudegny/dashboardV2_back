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
import { SoService } from './so.service';
import { SoDto } from './dto/so.dto';
import { SetupOrderDto } from '../setupOrder/dto/setup_go.dto';

@ApiTags('So')
@ApiExtraModels(SoDto)
@Controller('so')
export class SoController {
  constructor(private readonly soService: SoService) {}

  //create SgGoList and return the list of the setup used
  @Post('createSoList')
  @ApiBody({ type: [SoDto] })
  create(@Body() createSgGosDto: SoDto[]): Promise<SetupOrderDto[]> {
    return this.soService.create(createSgGosDto);
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
  update(@Param('id') id: string, @Body() updateSetupGoDto: SoDto) {
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
