import { Setup } from '../../entities/setup/Setup';
import { Failure } from '../../entities/failure/Failure';
import { Global_Order } from '../../entities/Global_Order';
import { Sub_Order } from '../../entities/Sub_Order';
import { Image_Go } from '../../entities/Image/Image_go';
import { Image_So } from '../../entities/Image/Image_so';
//failure
import { Failure_so } from '../../entities/Failure/Failure_so';

export class MainDatasDto {
  globalOrderList: Array<GlobalOrderFillWithDatasDto>;
  setupList: Array<Setup>;
  failureList: Array<Failure>;
}

export class GlobalOrderFillWithDatasDto {
  globalOrder: Global_Order;
  failureGo: Array<Failure>;
  setupGo: Array<Setup>;
  imageGo: Array<Image_Go>;
  subOrderList: Array<SubOrderFillWithDatasDto>;
}

export class SubOrderFillWithDatasDto {
  subOrder: Sub_Order;
  failureSo: Array<Failure_so>;
  setupSo: Array<Setup>;
  imageSo: Array<Image_So>;
}
