import { Module } from '@nestjs/common';
import { CategorySetupOrderService } from './category_setup_order.service';
import { CategorySetupOrderController } from './category_setup_order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category_Setup_Order } from 'src/entities/Setup/Category_Setup_Order';

@Module({
  imports: [TypeOrmModule.forFeature([Category_Setup_Order])],
  controllers: [CategorySetupOrderController],
  providers: [CategorySetupOrderService],
  exports: [CategorySetupOrderService],
})
export class CategorySetupOrderModule {}
