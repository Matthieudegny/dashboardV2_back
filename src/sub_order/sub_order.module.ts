import { Module } from '@nestjs/common';
import { SubOrderService } from './sub_order.service';
import { SubOrderController } from './sub_order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sub_Order } from '../entities/Sub_Order';

//others modules used
import { SetupSoModule } from 'src/setup_so/setup_so.module';
import { ImageSoModule } from 'src/image_so/image_so.module';
import { FailureSoModule } from 'src/failure_so/failure_so.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sub_Order]),
    SetupSoModule,
    ImageSoModule,
    FailureSoModule,
  ],
  controllers: [SubOrderController],
  providers: [SubOrderService],
  exports: [SubOrderService],
})
export class SubOrderModule {}
