import { Module } from '@nestjs/common';

import { Global_Order_Controller } from './global_order.controller';
import { Global_Order_Service } from './global_order_service';

// modules
import { OrderModule } from 'src/order/order.module';
import { S_o_Module } from 'src/s_o/s_o.module';
import { ImageOrderModule } from 'src/imageOrder/imageOrder.module';
import { Fg_Go_Module } from 'src/fg_go/fg_Go.module';

@Module({
  controllers: [Global_Order_Controller],
  providers: [Global_Order_Service],
  exports: [Global_Order_Service],
  imports: [OrderModule, Fg_Go_Module, S_o_Module, ImageOrderModule],
})
export class Global_Order_Module {}
