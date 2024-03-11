import { Module } from '@nestjs/common';
import { SubOrderService } from './sub_order.service';
import { SubOrderController } from './sub_order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sub_Order } from '../entities/Sub_Order';

//others modules used
import { SetupSoModule } from '../setup_so/setup_so.module';
import { ImageSoModule } from '../image_so/image_so.module';
import { Fs_So_Module } from '../fs_so/fs_So.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sub_Order]),
    SetupSoModule,
    ImageSoModule,
    Fs_So_Module,
  ],
  controllers: [SubOrderController],
  providers: [SubOrderService],
  exports: [SubOrderService],
})
export class SubOrderModule {}
