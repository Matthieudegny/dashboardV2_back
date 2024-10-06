import { Module, forwardRef } from '@nestjs/common';
import { SubOrder_Add_Service } from './sub_order_add.service';
import { SubOrder_Add_Controller } from './sub_order_add.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sub_Order_Add } from '../../entities/Sub_Order_Add';

//others modules used
import { Sso_Module } from '../../sso/sso.module';
import { ImageSubOrderModule } from '../../imageSubOrder/imageSubOrder.module';
import { Fs_So_Module } from '../../fs_so/fs_So.module';
import { OrderModule } from '../../order/order.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sub_Order_Add]),
    Sso_Module,
    ImageSubOrderModule,
    Fs_So_Module,
    forwardRef(() => OrderModule),
  ],
  controllers: [SubOrder_Add_Controller],
  providers: [SubOrder_Add_Service],
  exports: [SubOrder_Add_Service],
})
export class SubOrder_Add_Module {}
