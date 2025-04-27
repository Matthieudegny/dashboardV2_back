import { Module } from '@nestjs/common';

import { SubOrder_Module } from '../sub_order/suborder.module';
import { Global_SubOrder_Service } from './global_sub_order.service';
import { Global_SubOrder_Controller } from './global_sub_order.controller';
import { Fs_So_Module } from 'src/fs_so/fs_So.module';
import { Image_Suborder_Module } from 'src/image_Suborder/image_Sub_Order.module';

@Module({
  controllers: [Global_SubOrder_Controller],
  providers: [Global_SubOrder_Service],
  exports: [Global_SubOrder_Service],
  imports: [SubOrder_Module, Image_Suborder_Module, Fs_So_Module],
})
export class Global_SubOrder_Module {}
