import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FailureGoService } from './failure_go.service';
import { CreateFailureGoDto } from './dto/create-failure_go.dto';
import { UpdateFailureGoDto } from './dto/update-failure_go.dto';

@Controller('failure-go')
export class FailureGoController {
  constructor(private readonly failureGoService: FailureGoService) {}

  @Post()
  create(@Body() createFailureGoDto: CreateFailureGoDto) {
    return this.failureGoService.create(createFailureGoDto);
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
  update(@Param('id') id: string, @Body() updateFailureGoDto: UpdateFailureGoDto) {
    return this.failureGoService.update(+id, updateFailureGoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.failureGoService.remove(+id);
  }
}
