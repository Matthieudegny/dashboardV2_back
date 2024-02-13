import { Module } from '@nestjs/common';
import { SubOrderService } from './sub_order.service';
import { SubOrderController } from './sub_order.controller';

@Module({
  controllers: [SubOrderController],
  providers: [SubOrderService],
})
export class SubOrderModule {}
