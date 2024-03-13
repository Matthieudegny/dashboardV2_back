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
import { SgGoService } from './sg_go.service';
import { Sg_GoDto } from './dto/sg_go.dto';

@ApiTags('Ss_Go')
@Controller('ss-go')
export class SetupGoController {
  constructor(private readonly setupGoService: SgGoService) {}

  @Post()
  create(@Body() createSetupGoDto: Sg_GoDto) {
    return this.setupGoService.create(createSetupGoDto);
  }

  @Get()
  findAll() {
    return this.setupGoService.findAll();
  }

  @Get(':id')
  findAllByGlobalOrderId(@Param('id') id: string) {
    return this.setupGoService.findAllByGlobalOrderId(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.setupGoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSetupGoDto: Sg_GoDto) {
    return this.setupGoService.update(+id, updateSetupGoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.setupGoService.remove(+id);
  }
}
