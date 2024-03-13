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
import { FailureGoService } from './failure_go.service';
import { FailureGoDto } from './dtos/failure_go.dto';

@ApiTags('Failure_Go')
@Controller('failure_go')
export class FailureGoController {
  constructor(private failureService: FailureGoService) {}
  @Get()
  getFailure() {
    return this.failureService.findAllFailure();
  }

  @Get(':idUser')
  getFailureGoByIdUser(@Param('idUser', ParseIntPipe) idUser: number) {
    return this.failureService.findAllFailureByIdUSer(idUser);
  }

  @Post()
  createFailure(@Body() createFailure: FailureGoDto) {
    return this.failureService.createFailure(createFailure);
  }

  @Put(':id')
  updateFailure(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFailure: FailureGoDto,
  ) {
    return this.failureService.updateFailure(id, updateFailure);
  }

  @Delete(':id')
  deleteFailure(@Param('id', ParseIntPipe) id: number) {
    return this.failureService.deleteFailure(id);
  }
}
