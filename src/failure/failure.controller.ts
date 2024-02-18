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
import { FailureService } from './failure.service';
import { FailureDto } from './dtos/failure.dto';

@Controller('failure')
export class FailureController {
  constructor(private failureService: FailureService) {}
  @Get()
  getFailure() {
    return this.failureService.findAllFailure();
  }

  @Post()
  createFailure(@Body() createFailure: FailureDto) {
    return this.failureService.createFailure(createFailure);
  }

  @Put(':id')
  updateFailure(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFailure: FailureDto,
  ) {
    return this.failureService.updateFailure(id, updateFailure);
  }

  @Delete(':id')
  deleteFailure(@Param('id', ParseIntPipe) id: number) {
    return this.failureService.deleteFailure(id);
  }
}
