import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../entities/Order';

//module used
import { SubOrderModule } from '../sub_order/sub_order.module';
import { ImageGoModule } from '../image_go/image_go.module';

import { Fg_Go_Module } from '../fg_go/fg_Go.module';

import { So_Module } from '../so/so.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    SubOrderModule,
    So_Module,
    ImageGoModule,
    Fg_Go_Module,
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
