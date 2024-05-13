import { Module } from '@nestjs/common';
import { MainDatasService } from './main-datas.service';
import { MainDatasController } from './main-datas.controller';

//modules used
import { OrderModule } from '../order/order.module';
import { SetupSubOrderModule } from 'src/setupSubOrder/setupSubOrder.module';
import { SetupOrderModule } from 'src/setupOrder/setupOrder.module';
import { FailureGoModule } from 'src/failure_go/failure_go.module';
import { FailureSoModule } from 'src/failure_so/failure_so.module';

@Module({
  imports: [
    OrderModule,
    SetupSubOrderModule,
    SetupOrderModule,
    FailureGoModule,
    FailureSoModule,
  ],
  controllers: [MainDatasController],
  providers: [MainDatasService],
})
export class MainDatasModule {}
