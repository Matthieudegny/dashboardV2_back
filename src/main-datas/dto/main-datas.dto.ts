import { Global_Order } from '../../entities/Global_Order';
import { Sub_Order } from '../../entities/Sub_Order';
import { Image_Go } from '../../entities/Image/Image_go';
import { Image_So } from '../../entities/Image/Image_so';
//failure
import { Failure_go } from '../../entities/Failure/Failure_go';
import { Failure_so } from '../../entities/Failure/Failure_so';
//setup
import { Setup_go } from '../../entities/Setup/Setup_go';
import { Setup_so } from '../../entities/Setup/Setup_so';

export class MainDatasDto {
  globalOrderList: Array<GlobalOrderFillWithDatasDto>;
  setupGoList: Array<Setup_go>;
  setupSoList: Array<Setup_so>;
  failureGoList: Array<Failure_go>;
  failureSoList: Array<Failure_so>;
}

export class GlobalOrderFillWithDatasDto {
  globalOrder: Global_Order;
  failureGo: Array<Failure_go>;
  setupGo: Array<Setup_go>;
  imageGo: Array<Image_Go>;
  subOrderList: Array<SubOrderFillWithDatasDto>;
}

export class SubOrderFillWithDatasDto {
  subOrder: Sub_Order;
  failureSo: Array<Failure_so>;
  setupSo: Array<Setup_so>;
  imageSo: Array<Image_So>;
}
