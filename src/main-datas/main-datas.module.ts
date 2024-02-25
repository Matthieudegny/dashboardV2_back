import { Module } from '@nestjs/common';
import { MainDatasService } from './main-datas.service';
import { MainDatasController } from './main-datas.controller';

@Module({
  controllers: [MainDatasController],
  providers: [MainDatasService],
})
export class MainDatasModule {}
