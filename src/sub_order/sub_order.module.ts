import { Module } from '@nestjs/common';
import { SubOrderService } from './sub_order.service';
import { SubOrderController } from './sub_order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sub_Order } from '../entities/Sub_Order';

//others modules used
import { Ss_So_Module } from '../ss_so/ss_so.module';
import { ImageSoModule } from '../image_so/image_so.module';
import { Fs_So_Module } from '../fs_so/fs_so.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sub_Order]),
    Ss_So_Module,
    ImageSoModule,
    Fs_So_Module,
  ],
  controllers: [SubOrderController],
  providers: [SubOrderService],
  exports: [SubOrderService],
})
export class SubOrderModule {}
