import { Module } from '@nestjs/common';
import { SubOrderService } from './sub_order.service';
import { SubOrderController } from './sub_order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sub_Order } from '../entities/Sub_Order';

//others modules used
import { SetupSoModule } from '../setup_so/setup_so.module';
import { ImageSoModule } from '../image_so/image_so.module';
import { Fs_So_Module } from '../fs_so/fs_so.module';
import { FailureSoModule } from '../failure_so/failure_so.module';

import { Fs_SoService } from '../fs_so/fs_so.service';
import { FailureSoService } from '../failure_so/failure_so.service';

import { Fs_So } from '../entities/Failure/Associations/Fs_So';
import { Failure_so } from '../entities/Failure/Failure_so';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sub_Order, Fs_So, Failure_so]),
    SetupSoModule,
    ImageSoModule,
    Fs_So_Module,
    FailureSoModule,
  ],
  controllers: [SubOrderController],
  providers: [SubOrderService, Fs_SoService, FailureSoService],
  exports: [SubOrderService],
})
export class SubOrderModule {}
