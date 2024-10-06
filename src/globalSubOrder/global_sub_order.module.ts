import { Module } from '@nestjs/common';

import { Sub_OrderModule } from '../sub_order/sub_order_module';

@Module({
  imports: [Sub_OrderModule],
})
export class Global_SubOrder_OrderModule {}
