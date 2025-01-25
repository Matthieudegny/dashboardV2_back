import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param } from '@nestjs/common';
//Services
import { MainDatasService } from './main-datas.service';

@ApiTags('MainDatas')
@Controller('main-datas')
export class MainDatasController {
  constructor(private readonly mainDatasService: MainDatasService) {}

  @Get(':idUser')
  findMainDatasbyIdUser(@Param('idUser') idUser: number) {
    return this.mainDatasService.findMainDatasbyIdUser(idUser);
  }

  @Get('test')
  test() {
    return 'test';
  }
}
