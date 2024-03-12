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

import { Fg_GoService } from '../fg_go/fg_Go.service';
import { FailureGoService } from '../failure_go/failure_go.service';

import { Fg_Go } from '../entities/Failure/Associations/Fg_go';
import { Failure_go } from '../entities/Failure/Failure_go';

@Module({
  imports: [
    TypeOrmModule.forFeature([Global_Order, Fg_Go, Failure_go]),
    SubOrderModule,
    SetupGoModule,
    ImageGoModule,
    FailureGoModule,
  ],
  controllers: [GlobalOrderController],
  providers: [GlobalOrderService, Fg_GoService, FailureGoService],
  exports: [GlobalOrderService],
})
export class GlobalOrderModule {}
