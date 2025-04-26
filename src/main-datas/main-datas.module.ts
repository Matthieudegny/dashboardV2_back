import { Module } from '@nestjs/common';
import { MainDatasService } from './main-datas.service';
import { MainDatasController } from './main-datas.controller';

//modules used
import { Setup_SubOrder_Module } from 'src/setup_SubOrder/setup_SubOrder.module';
import { SetupOrderModule } from 'src/setupOrder/setupOrder.module';
import { FailureGoModule } from 'src/failure_go/failure_go.module';
import { FailureSoModule } from 'src/failure_so/failure_so.module';
import { UserModule } from 'src/user/user.module';
import { Global_Order_Module } from 'src/globalOrder/global_order.module';
import { TradingInstrumentModule } from '../tradingInstrument/tradingInstrument.module';

@Module({
  imports: [
    Setup_SubOrder_Module,
    SetupOrderModule,
    FailureGoModule,
    FailureSoModule,
    UserModule,
    Global_Order_Module,
    TradingInstrumentModule,
  ],
  controllers: [MainDatasController],
  providers: [MainDatasService],
})
export class MainDatasModule {}
