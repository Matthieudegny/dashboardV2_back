import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SetupGoService } from './setup_go.service';
import { SetupGoDto } from './dto/setup_go.dto';

@Controller('setup-go')
export class SetupGoController {
  constructor(private readonly setupGoService: SetupGoService) {}

  @Post()
  create(@Body() createSetupGoDto: SetupGoDto) {
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
  update(@Param('id') id: string, @Body() updateSetupGoDto: SetupGoDto) {
    return this.setupGoService.update(+id, updateSetupGoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.setupGoService.remove(+id);
  }
}
