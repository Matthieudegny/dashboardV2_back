import { Module } from '@nestjs/common';
import { SetupSubOrderService } from './setupSubOrder.service';
import { SetupSubOrderController } from './setupSubOrder.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SetupSubOrder } from '../entities/Setup/SetupSubOrder';

@Module({
  imports: [TypeOrmModule.forFeature([SetupSubOrder])],
  controllers: [SetupSubOrderController],
  providers: [SetupSubOrderService],
  exports: [SetupSubOrderService],
})
export class SetupSubOrderModule {}
