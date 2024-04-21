import { Module, forwardRef } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../entities/Order';

//module used
import { SubOrderModule } from '../sub_order/sub_order.module';
import { ImageOrderModule } from '../imageOrder/imageOrder.module';

import { Fg_Go_Module } from '../fg_go/fg_Go.module';

import { So_Module } from '../so/so.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    forwardRef(() => SubOrderModule),
    So_Module,
    ImageOrderModule,
    Fg_Go_Module,
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
