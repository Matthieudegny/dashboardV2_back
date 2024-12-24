import { Module } from '@nestjs/common';
import { SetupOrderService } from './setupOrder.service';
import { SetupOrderController } from './setupOrder.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Setup_Order } from '../entities/Setup/SetupOrder';
import { Category_Setup_Order } from 'src/entities/Setup/Category_Setup_Order';
@Module({
  imports: [TypeOrmModule.forFeature([Setup_Order, Category_Setup_Order])],
  controllers: [SetupOrderController],
  providers: [SetupOrderService],
  exports: [SetupOrderService],
})
export class SetupOrderModule {}
