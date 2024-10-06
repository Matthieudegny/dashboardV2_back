import { Module, forwardRef } from '@nestjs/common';
import { SubOrder_Add_Service } from './suborder_Add.service';
import { SubOrder_Add_Controller } from './suborder_Add.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Suborder_Add } from '../../entities/Suborder_Add';

//others modules used
import { S_soa_Module } from '../../s_soa/s_soa.module';
import { Image_Suborder_Add_Module } from '../../image_Suborder_Add/image_Sub_Order_Add.module';
import { Fs_So_Module } from '../../fs_so/fs_So.module';
import { OrderModule } from '../../order/order.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Suborder_Add]),
    S_soa_Module,
    Image_Suborder_Add_Module,
    Fs_So_Module,
    forwardRef(() => OrderModule),
  ],
  controllers: [SubOrder_Add_Controller],
  providers: [SubOrder_Add_Service],
  exports: [SubOrder_Add_Service],
})
export class SubOrder_Add_Module {}
