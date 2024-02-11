import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateFailureDto } from 'src/failure/dtos/CreateFailure.dto';
import { FailureService } from 'src/failure/services/failure/failure.service';

@Controller('failure')
export class FailureController {
  constructor(private failureService: FailureService) {}
  @Get()
  getFailure() {}

  @Post()
  createFailure(@Body() createFailure: CreateFailureDto) {
    this.failureService.createFailure(createFailure);
  }
}
