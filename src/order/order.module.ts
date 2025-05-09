import { Module, forwardRef } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../entities/Order';

//module used
import { SubOrder_Module } from '../sub_order/suborder.module';
import { ImageOrderModule } from '../imageOrder/imageOrder.module';
import { Fg_Go_Module } from '../fg_go/fg_Go.module';
import { S_o_Module } from '../s_o/s_o.module';
import { Global_SubOrder_Module } from 'src/globalSubOrder/global_sub_order.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    forwardRef(() => SubOrder_Module),
    S_o_Module,
    ImageOrderModule,
    Fg_Go_Module,
    Global_SubOrder_Module,
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
