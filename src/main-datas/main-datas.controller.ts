import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param } from '@nestjs/common';
import { Public } from 'src/public.decorator';

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

  @Public()
  @Get('test')
  test() {
    return 'test';
  }
}
