import { Module, forwardRef } from '@nestjs/common';
import { SubOrderService } from './sub_order.service';
import { SubOrderController } from './sub_order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sub_Order } from '../entities/Sub_Order';

//others modules used
import { Sso_Module } from '../sso/sso.module';
import { ImageSubOrderModule } from '../imageSubOrder/imageSubOrder.module';
import { Fs_So_Module } from '../fs_so/fs_so.module';
import { OrderModule } from '../order/order.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sub_Order]),
    Sso_Module,
    ImageSubOrderModule,
    Fs_So_Module,
    forwardRef(() => OrderModule),
  ],
  controllers: [SubOrderController],
  providers: [SubOrderService],
  exports: [SubOrderService],
})
export class SubOrderModule {}
