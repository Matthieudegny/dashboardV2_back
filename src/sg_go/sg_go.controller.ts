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
import { SgGoService } from './sg_go.service';
import { Sg_GoDto } from './dto/sg_go.dto';
import { SetupGoDto } from '../setup_go/dto/setup_go.dto';

@ApiTags('Sg_Go')
@ApiExtraModels(Sg_GoDto)
@Controller('sg_go')
export class SetupGoController {
  constructor(private readonly sgGoService: SgGoService) {}

  //create SgGoList and return the list of the setup used
  @Post('createSgGoList')
  @ApiBody({ type: [Sg_GoDto] })
  create(@Body() createSgGosDto: Sg_GoDto[]): Promise<SetupGoDto[]> {
    return this.sgGoService.create(createSgGosDto);
  }

  @Get()
  findAll() {
    return this.sgGoService.findAll();
  }

  @Get(':id')
  findAllByGlobalOrderId(@Param('id') id: string) {
    return this.sgGoService.findAllByGlobalOrderId(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sgGoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSetupGoDto: Sg_GoDto) {
    return this.sgGoService.update(+id, updateSetupGoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sgGoService.remove(+id);
  }
}
