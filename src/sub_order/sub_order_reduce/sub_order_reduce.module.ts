import { Module, forwardRef } from '@nestjs/common';
import { SubOrder_Reduce_Service } from './sub_order_reduce.service';
import { SubOrder_Reduce_Controller } from './sub_order_reduce.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sub_Order_Reduce } from '../../entities/Sub_Order_Reduce';

//others modules used
import { S_sor_Module } from '../../s_sor/s_sor.module';
import { Image_Suborder_Reduce_Module } from '../../image_Suborder_Reduce/image_Sub_Order_Reduce.module';
import { Fs_So_Module } from '../../fs_so/fs_So.module';
import { OrderModule } from '../../order/order.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sub_Order_Reduce]),
    S_sor_Module,
    Image_Suborder_Reduce_Module,
    Fs_So_Module,
    forwardRef(() => OrderModule),
  ],
  controllers: [SubOrder_Reduce_Controller],
  providers: [SubOrder_Reduce_Service],
  exports: [SubOrder_Reduce_Service],
})
export class SubOrder_Reduce_Module {}
