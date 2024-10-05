import { Module } from '@nestjs/common';
import { SubOrder_Reduce_Module } from './sub_order_reduce/sub_order_reduce.module';
import { SubOrder_Add_Module } from '../sub_order_add/sub_order_add.module';

@Module({
  imports: [SubOrder_Reduce_Module, SubOrder_Add_Module],
})
export class Sub_OrderModule {}
