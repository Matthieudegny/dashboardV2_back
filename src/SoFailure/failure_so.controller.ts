import { ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { FailureSo_Service } from './failure_so.service';
import { FailureSoDto } from './dtos/failureSo.dto';

@ApiTags('Failure_So')
@Controller('failure_so')
export class FailureSoController {
  constructor(private failureService: FailureSo_Service) {}
  @Get()
  getFailure() {
    return [1, 2, 3];
    return this.failureService.findAllFailure();
  }

  @Post()
  createFailure(@Body() createFailure: FailureSoDto) {
    return this.failureService.createFailure(createFailure);
  }

  @Put(':id')
  updateFailure(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFailure: FailureSoDto,
  ) {
    return this.failureService.updateFailure(id, updateFailure);
  }

  @Delete(':id')
  deleteFailure(@Param('id', ParseIntPipe) id: number) {
    return this.failureService.deleteFailure(id);
  }
}
