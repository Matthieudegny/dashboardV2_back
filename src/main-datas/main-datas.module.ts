import { Module } from '@nestjs/common';
import { MainDatasService } from './main-datas.service';
import { MainDatasController } from './main-datas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
//services
import { SetupGoService } from '../setup_go/setup_go.service';
import { SetupService } from '../setup/setup.service';
import { SetupSoService } from '../setup_so/setup_so.service';
import { ImageGoService } from '../image_go/image_go.service';
import { ImageSoService } from '../image_so/image_so.service';
import { FailureService } from '../failure/failure.service';
import { FailureGoService } from '../failure_go/failure_go.service';
import { FailureSoService } from '../failure_so/failure_so.service';
import { SubOrderService } from '../sub_order/sub_order.service';
import { GlobalOrderService } from '../global_order/global_order.service';
//entities
import { Setup_Go } from '../entities/setup/Setup_go';
import { Setup_So } from '../entities/setup/Setup_so';
import { Setup } from '../entities/setup/Setup';
import { Failure } from '../entities/Failure/Failure';
import { Failure_Go } from '../entities/Failure/Failure_go';
import { Failure_So } from '../entities/Failure/Failure_so';
import { Image_Go } from '../entities/image/Image_go';
import { Image_So } from '../entities/image/Image_so';
import { Sub_Order } from '../entities/Sub_Order';
import { Global_Order } from '../entities/Global_Order';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Setup_Go,
      Setup,
      Setup_So,
      Failure,
      Failure_Go,
      Failure_So,
      Image_Go,
      Image_So,
      Sub_Order,
      Global_Order,
    ]),
  ],
  controllers: [MainDatasController],
  providers: [
    MainDatasService,
    SetupGoService,
    SetupService,
    SetupSoService,
    ImageGoService,
    ImageSoService,
    FailureService,
    FailureGoService,
    FailureSoService,
    SubOrderService,
    GlobalOrderService,
  ],
})
export class MainDatasModule {}
