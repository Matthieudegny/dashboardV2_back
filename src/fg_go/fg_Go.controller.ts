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
import { Fg_GoService } from './fg_Go.service';
import { Fg_Go_Dto } from './dto/fg_Go.dto';

@ApiTags('Fg_Go')
@Controller('fg-go')
export class Fg_GoController {
  constructor(private readonly failureGoService: Fg_GoService) {}

  @Post()
  create(@Body() createFailureGoDto: Fg_Go_Dto) {
    return this.failureGoService.createFailure_go(createFailureGoDto);
  }

  @Get()
  findAll() {
    return this.failureGoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.failureGoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFailureGoDto: Fg_Go_Dto) {
    return this.failureGoService.update(+id, updateFailureGoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.failureGoService.remove(+id);
  }
}
