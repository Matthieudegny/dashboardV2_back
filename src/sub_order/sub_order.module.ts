import { Module } from '@nestjs/common';
import { SubOrderService } from './sub_order.service';
import { SubOrderController } from './sub_order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sub_Order } from '../entities/Sub_Order';

@Module({
  imports: [TypeOrmModule.forFeature([Sub_Order])],
  controllers: [SubOrderController],
  providers: [SubOrderService],
})
export class SubOrderModule {}
