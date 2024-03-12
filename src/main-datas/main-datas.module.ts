import { Module } from '@nestjs/common';
import { MainDatasService } from './main-datas.service';
import { MainDatasController } from './main-datas.controller';

//modules used
import { GlobalOrderModule } from '../global_order/global_order.module';
import { SetupModule } from '../setup/setup.module';
import { FailureGoModule } from 'src/failure_go/failure_go.module';
import { FailureSoModule } from 'src/failure_so/failure_so.module';

@Module({
  imports: [GlobalOrderModule, SetupModule, FailureGoModule, FailureSoModule],
  controllers: [MainDatasController],
  providers: [MainDatasService],
})
export class MainDatasModule {}
