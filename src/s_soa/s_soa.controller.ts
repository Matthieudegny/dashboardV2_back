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
import { S_Soa_Service } from './s_soa.service';
import { S_soa_Dto } from './dto/s_soa.dto';
import { Setup_SubOrder_Add_Dto } from '../setup_SubOrder_Add/dto/setup_SubOrder_Add.dto';

@ApiTags('S_soa')
@ApiExtraModels(S_soa_Dto)
@Controller('s_soa')
export class S_Soa_Controller {
  constructor(private readonly ssoaService: S_Soa_Service) {}

  //create SgGoList and return the list of the setup used
  @Post('createSoList')
  @ApiBody({ type: [S_soa_Dto] })
  create(
    @Body() createSgGosDto: S_soa_Dto[],
  ): Promise<Setup_SubOrder_Add_Dto[]> {
    return this.ssoaService.create(createSgGosDto);
  }

  @Get()
  findAll() {
    return this.ssoaService.findAll();
  }

  @Get(':id')
  findAllByGlobalOrderId(@Param('id') id: string) {
    return this.ssoaService.findAllSetupByOrderId(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ssoaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSetupGoDto: S_soa_Dto) {
    return this.ssoaService.update(+id, updateSetupGoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ssoaService.remove(+id);
  }

  @Delete('deleteAll/:id')
  removeAllByGlobalOrderId(@Param('id') id: string): Promise<boolean> {
    return this.ssoaService.removeAllByOrderId(+id);
  }
}
