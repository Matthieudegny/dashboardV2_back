import { Module, forwardRef } from '@nestjs/common';
import { SubOrder_Service } from './suborder.service';
import { SubOrder_Controller } from './suborder.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Suborder } from '../entities/Suborder';

//others modules used
import { S_so_Module } from '../s_so/s_so.module';
import { Image_Suborder_Module } from '../image_Suborder/image_Sub_Order.module';
import { Fs_So_Module } from '../fs_so/fs_So.module';
import { OrderModule } from '../order/order.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Suborder]),
    S_so_Module,
    Image_Suborder_Module,
    Fs_So_Module,
    forwardRef(() => OrderModule),
  ],
  controllers: [SubOrder_Controller],
  providers: [SubOrder_Service],
  exports: [SubOrder_Service],
})
export class SubOrder_Module {}
