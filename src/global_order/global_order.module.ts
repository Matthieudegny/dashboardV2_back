import { Module } from '@nestjs/common';
import { GlobalOrderService } from './global_order.service';
import { GlobalOrderController } from './global_order.controller';
import { OpenOrderModule } from './open_order/open_order.module';
import { ClosingOrderModule } from './closing_order/closing_order.module';

@Module({
  controllers: [GlobalOrderController],
  providers: [GlobalOrderService],
  imports: [OpenOrderModule, ClosingOrderModule],
})
export class GlobalOrderModule {}
