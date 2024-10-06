import { Module } from '@nestjs/common';
import { SetupOrderService } from './setupOrder.service';
import { SetupOrderController } from './setupOrder.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Setup_Order } from '../entities/Setup/SetupOrder';

@Module({
  imports: [TypeOrmModule.forFeature([Setup_Order])],
  controllers: [SetupOrderController],
  providers: [SetupOrderService],
  exports: [SetupOrderService],
})
export class SetupOrderModule {}
