import { Module } from '@nestjs/common';
import { CategorySetupSubOrderService } from './category_setup_SubOrder.service';
import { CategorySetupSubOrderController } from './category_setup_SubOrder.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category_Setup_SubOrder } from 'src/entities/Setup/Category_Setup_SubOrder';

@Module({
  imports: [TypeOrmModule.forFeature([Category_Setup_SubOrder])],
  controllers: [CategorySetupSubOrderController],
  providers: [CategorySetupSubOrderService],
  exports: [CategorySetupSubOrderService],
})
export class CategorySetupSubOrderModule {}
