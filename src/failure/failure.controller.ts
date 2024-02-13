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
import { CreateFailureDto } from 'src/failure/dtos/CreateFailure.dto';
import { FailureService } from 'src/failure/failure.service';
import { UpdateFailureDto } from 'src/failure/dtos/UpdateFailure.dto';

@Controller('failure')
export class FailureController {
  constructor(private failureService: FailureService) {}
  @Get()
  getFailure() {
    return this.failureService.findAllFailure();
  }

  @Post()
  createFailure(@Body() createFailure: CreateFailureDto) {
    this.failureService.createFailure(createFailure);
  }

  @Put(':id')
  updateFailure(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFailure: UpdateFailureDto,
  ) {
    this.failureService.updateFailure(id, updateFailure);
  }

  @Delete(':id')
  deleteFailure(@Param('id', ParseIntPipe) id: number) {
    this.failureService.deleteFailure(id);
  }
}
