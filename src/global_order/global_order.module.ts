import { Module } from '@nestjs/common';
import { GlobalOrderService } from './global_order.service';
import { GlobalOrderController } from './global_order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Global_Order } from '../entities/Global_Order';

//module used
import { SubOrderModule } from '../sub_order/sub_order.module';
import { ImageGoModule } from '../image_go/image_go.module';
import { FailureGoModule } from '../failure_go/failure_go.module';

import { Fg_GoService } from '../fg_go/fg_Go.service';
import { FailureGoService } from '../failure_go/failure_go.service';

import { Fg_Go } from '../entities/Failure/Associations/Fg_go';
import { Failure_go } from '../entities/Failure/Failure_go';

import { Sg_Go_Module } from 'src/sg_go/sg_go.module';
import { SgGoService } from 'src/sg_go/sg_go.service';
import { SetupGoService } from 'src/setup_go/setupGo.service';

import { Sg_Go } from 'src/entities/Setup/Associations/Ss_go';
import { Setup_go } from 'src/entities/Setup/Setup_go';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Global_Order,
      Fg_Go,
      Failure_go,
      Sg_Go,
      Setup_go,
    ]),
    SubOrderModule,
    Sg_Go_Module,
    ImageGoModule,
    FailureGoModule,
  ],
  controllers: [GlobalOrderController],
  providers: [
    GlobalOrderService,
    Fg_GoService,
    FailureGoService,
    SgGoService,
    SetupGoService,
  ],
  exports: [GlobalOrderService],
})
export class GlobalOrderModule {}
