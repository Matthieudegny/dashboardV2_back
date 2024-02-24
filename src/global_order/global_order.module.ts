import { Module } from '@nestjs/common';
import { GlobalOrderService } from './global_order.service';
import { GlobalOrderController } from './global_order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Global_Order } from '../entities/Global_Order';

@Module({
  imports: [TypeOrmModule.forFeature([Global_Order])],
  controllers: [GlobalOrderController],
  providers: [GlobalOrderService],
})
export class GlobalOrderModule {}
