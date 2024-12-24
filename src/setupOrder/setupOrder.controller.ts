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

@ApiTags('Setup_Order')
@Controller('setup_Order')
export class SetupOrderController {
  constructor(private setupService: SetupOrderService) {}

  @Post('createSetupOrder')
  create(@Body() createSetupDto: SetupOrderDto) {
    return this.setupService.create(createSetupDto);
  }

  @Get('findAllSetupOrder')
  findAll() {
    return this.setupService.findAll();
  }

  @Get('findAllSetupOrderByIdUser/:idUser')
  findAllSetupGoByIdUser(@Param('idUser') idUser: string) {
    return this.setupService.findAllSetupGoByIdUser(+idUser);
  }

  @Get('findOneSetupOrder/:id')
  findOne(@Param('id') id: string) {
    return this.setupService.findOne(+id);
  }

  @Patch('updateSetupOrder/:id')
  update(@Param('id') id: string, @Body() updateSetupDto: SetupOrderDto) {
    try {
      return this.setupService.update(+id, updateSetupDto);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }

  @Delete('deleteSetupOrder/:id')
  remove(@Param('id') id: string) {
    return this.setupService.remove(+id);
  }
}
