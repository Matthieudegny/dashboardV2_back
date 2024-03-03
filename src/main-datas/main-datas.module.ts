import { Module } from '@nestjs/common';
import { MainDatasService } from './main-datas.service';
import { MainDatasController } from './main-datas.controller';

//modules used
import { GlobalOrderModule } from '../global_order/global_order.module';
import { SetupModule } from '../setup/setup.module';
import { FailureModule } from '../failure/failure.module';

@Module({
  imports: [GlobalOrderModule, SetupModule, FailureModule],
  controllers: [MainDatasController],
  providers: [MainDatasService],
})
export class MainDatasModule {}
