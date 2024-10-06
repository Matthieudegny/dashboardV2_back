import { Module, forwardRef } from '@nestjs/common';
import { SubOrder_Reduce_Service } from './sub_order_reduce.service';
import { SubOrder_Reduce_Controller } from './sub_order_reduce.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sub_Order_Reduce } from '../../entities/Sub_Order_Reduce';

//others modules used
import { Sso_Module } from '../../sso/sso.module';
import { ImageSubOrderModule } from '../../imageSubOrder/imageSubOrder.module';
import { Fs_So_Module } from '../../fs_so/fs_So.module';
import { OrderModule } from '../../order/order.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sub_Order_Reduce]),
    Sso_Module,
    ImageSubOrderModule,
    Fs_So_Module,
    forwardRef(() => OrderModule),
  ],
  controllers: [SubOrder_Reduce_Controller],
  providers: [SubOrder_Reduce_Service],
  exports: [SubOrder_Reduce_Service],
})
export class SubOrder_Reduce_Module {}
