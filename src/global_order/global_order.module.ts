import { Module } from '@nestjs/common';
import { GlobalOrderService } from './global_order.service';
import { GlobalOrderController } from './global_order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Global_Order } from '../entities/Global_Order';

//module used
import { SubOrderModule } from '../sub_order/sub_order.module';
import { SetupGoModule } from '../setup_go/setup_go.module';
import { ImageGoModule } from '../image_go/image_go.module';
import { FailureGoModule } from '../failure_go/failure_go.module';

//services used
import { SubOrderService } from '../sub_order/sub_order.service';
import { SetupGoService } from '../setup_go/setup_go.service';
import { ImageGoService } from '../image_go/image_go.service';
import { FailureGoService } from '../failure_go/failure_go.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Global_Order]),
    SubOrderModule,
    SetupGoModule,
    ImageGoModule,
    FailureGoModule,
  ],
  controllers: [GlobalOrderController],
  providers: [GlobalOrderService],
  exports: [GlobalOrderService],
})
export class GlobalOrderModule {}
