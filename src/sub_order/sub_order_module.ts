import { Module } from '@nestjs/common';
import { SubOrder_Reduce_Module } from './sub_order_reduce/suborder_Reduce.module';
import { SubOrder_Add_Module } from './sub_order_add/suborder_Add.module';

@Module({
  imports: [SubOrder_Reduce_Module, SubOrder_Add_Module],
})
export class Sub_OrderModule {}
