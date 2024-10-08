import { Module } from '@nestjs/common';

import { Sub_OrderModule } from '../sub_order/sub_order_module';
import { Global_SubOrder_Service } from './global_sub_order.service';
import { Global_SubOrder_Controller } from './global_sub_order.controller';
import { Fs_So_Module } from 'src/fs_so/fs_So.module';
import { Image_Suborder_Add_Module } from 'src/image_Suborder_Add/image_Sub_Order_Add.module';
import { S_soa_Module } from 'src/s_soa/s_soa.module';
import { S_sor_Module } from 'src/s_sor/s_sor.module';
import { Image_Suborder_Reduce_Module } from 'src/image_Suborder_Reduce/image_Sub_Order_Reduce.module';

@Module({
  controllers: [Global_SubOrder_Controller],
  providers: [Global_SubOrder_Service],
  exports: [Global_SubOrder_Service],
  imports: [
    Sub_OrderModule,
    S_soa_Module,
    S_sor_Module,
    Image_Suborder_Add_Module,
    Image_Suborder_Reduce_Module,
    Fs_So_Module,
  ],
})
export class Global_SubOrder_OrderModule {}
