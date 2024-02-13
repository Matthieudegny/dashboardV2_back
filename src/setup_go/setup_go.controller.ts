import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SetupGoService } from './setup_go.service';
import { CreateSetupGoDto } from './dto/create-setup_go.dto';
import { UpdateSetupGoDto } from './dto/update-setup_go.dto';

@Controller('setup-go')
export class SetupGoController {
  constructor(private readonly setupGoService: SetupGoService) {}

  @Post()
  create(@Body() createSetupGoDto: CreateSetupGoDto) {
    return this.setupGoService.create(createSetupGoDto);
  }

  @Get()
  findAll() {
    return this.setupGoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.setupGoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSetupGoDto: UpdateSetupGoDto) {
    return this.setupGoService.update(+id, updateSetupGoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.setupGoService.remove(+id);
  }
}
