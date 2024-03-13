import { Module } from '@nestjs/common';
import { MainDatasService } from './main-datas.service';
import { MainDatasController } from './main-datas.controller';

//modules used
import { GlobalOrderModule } from '../global_order/global_order.module';
import { SetupSoModule } from 'src/setup_so/setupSo.module';
import { SetupGoModule } from 'src/setup_go/setupGo.module';
import { FailureGoModule } from 'src/failure_go/failure_go.module';
import { FailureSoModule } from 'src/failure_so/failure_so.module';

@Module({
  imports: [
    GlobalOrderModule,
    SetupSoModule,
    SetupGoModule,
    FailureGoModule,
    FailureSoModule,
  ],
  controllers: [MainDatasController],
  providers: [MainDatasService],
})
export class MainDatasModule {}
