import { Module } from '@nestjs/common';
import { GlobalOrderService } from './global_order.service';
import { GlobalOrderController } from './global_order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Global_Order } from '../entities/Global_Order';

//module used
import { SubOrderModule } from '../sub_order/sub_order.module';
import { ImageGoModule } from '../image_go/image_go.module';

import { Fg_Go_Module } from '../fg_go/fg_Go.module';

import { Sg_Go_Module } from '../sg_go/sg_go.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Global_Order]),
    SubOrderModule,
    Sg_Go_Module,
    ImageGoModule,
    Fg_Go_Module,
  ],
  controllers: [GlobalOrderController],
  providers: [GlobalOrderService],
  exports: [GlobalOrderService],
})
export class GlobalOrderModule {}
