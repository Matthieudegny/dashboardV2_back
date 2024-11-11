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
import { SetupOrderService } from './setupOrder.service';
import { SetupOrderDto } from './dto/setup_go.dto';

@ApiTags('Setup_Go')
@Controller('setup_Order')
export class SetupOrderController {
  constructor(private setupService: SetupOrderService) {}

  @Post('createSetupGo')
  create(@Body() createSetupDto: SetupOrderDto) {
    return this.setupService.create(createSetupDto);
  }

  @Get()
  findAll() {
    return this.setupService.findAll();
  }

  @Get(':idUser')
  findAllSetupGoByIdUser(@Param('idUser') idUser: string) {
    return this.setupService.findAllSetupGoByIdUser(+idUser);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.setupService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSetupDto: SetupOrderDto) {
    return this.setupService.update(+id, updateSetupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.setupService.remove(+id);
  }
}
