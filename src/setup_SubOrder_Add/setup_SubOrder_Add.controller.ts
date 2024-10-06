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
import { Setup_SubOrder_Add_Service } from './setup_SubOrder_Add.service';
import { Setup_SubOrder_Add_Dto } from './dto/setup_SubOrder_Add.dto';

@ApiTags('Setup_SubOrder_Add')
@Controller('setup_SubOrder_Add')
export class Setup_SubOrder_Add_Controller {
  constructor(private Setup_SubOrder_Add_Service: Setup_SubOrder_Add_Service) {}

  @Post('createSetupSoAdd')
  create(@Body() createSetupDto: Setup_SubOrder_Add_Dto) {
    return this.Setup_SubOrder_Add_Service.create(createSetupDto);
  }

  @Get()
  findAll() {
    return this.Setup_SubOrder_Add_Service.findAll();
  }

  @Get(':idUser')
  findAllSetupSoByIdUser(@Param('idUser') idUser: string) {
    return this.Setup_SubOrder_Add_Service.findAllSetupSoByIdUser(+idUser);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.Setup_SubOrder_Add_Service.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSetupDto: Setup_SubOrder_Add_Dto,
  ) {
    return this.Setup_SubOrder_Add_Service.update(+id, updateSetupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.Setup_SubOrder_Add_Service.remove(+id);
  }
}
