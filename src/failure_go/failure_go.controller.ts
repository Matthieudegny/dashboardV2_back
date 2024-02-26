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
import { FailureGoService } from './failure_go.service';
import { Failure_GoDto } from './dto/failure_go.dto';

@ApiTags('Failure_Go')
@Controller('failure-go')
export class FailureGoController {
  constructor(private readonly failureGoService: FailureGoService) {}

  @Post()
  create(@Body() createFailureGoDto: Failure_GoDto) {
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
  update(@Param('id') id: string, @Body() updateFailureGoDto: Failure_GoDto) {
    return this.failureGoService.update(+id, updateFailureGoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.failureGoService.remove(+id);
  }
}
