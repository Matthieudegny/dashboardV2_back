import { Module, forwardRef } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../entities/Order';

//module used
import { SubOrder_Add_Module } from '../sub_order/sub_order_add/sub_order_add.module';
import { SubOrder_Reduce_Module } from '../sub_order/sub_order_reduce/sub_order_reduce.module';
import { ImageOrderModule } from '../imageOrder/imageOrder.module';

import { Fg_Go_Module } from '../fg_go/fg_Go.module';

import { S_o_Module } from '../s_o/s_o.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    forwardRef(() => SubOrder_Add_Module),
    forwardRef(() => SubOrder_Reduce_Module),
    S_o_Module,
    ImageOrderModule,
    Fg_Go_Module,
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
