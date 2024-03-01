import { Module } from '@nestjs/common';
import { MainDatasService } from './main-datas.service';
import { MainDatasController } from './main-datas.controller';

//modules used
import { GlobalOrderModule } from 'src/global_order/global_order.module';
import { SetupModule } from 'src/setup/setup.module';
import { FailureModule } from 'src/failure/failure.module';

@Module({
  imports: [GlobalOrderModule, SetupModule, FailureModule],
  controllers: [MainDatasController],
  providers: [MainDatasService],
})
export class MainDatasModule {}
