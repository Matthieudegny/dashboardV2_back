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
import { SetupSoService } from './setupSo.service';
import { SetupSoDto } from './dto/setupSo.dto';

@ApiTags('Setup_So')
@Controller('setup_so')
export class SetupSoController {
  constructor(private setupService: SetupSoService) {}

  @Post('createSetupSo')
  create(@Body() createSetupDto: SetupSoDto) {
    console.log('controller');
    return this.setupService.create(createSetupDto);
  }

  @Get()
  findAll() {
    return this.setupService.findAll();
  }

  @Get(':idUser')
  findAllSetupSoByIdUser(@Param('idUser') idUser: string) {
    return this.setupService.findAllSetupSoByIdUser(+idUser);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.setupService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSetupDto: SetupSoDto) {
    return this.setupService.update(+id, updateSetupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.setupService.remove(+id);
  }
}
