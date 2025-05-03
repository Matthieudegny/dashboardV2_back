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
    const result = this.mainDatasService.findMainDatasbyIdUser(idUser);
    console.log('result', result);
    return result;
  }

  @Public()
  @Get('test')
  test() {
    return 'test';
  }
}
