import { Setup } from 'src/entities/setup/Setup';
import { Failure } from 'src/entities/failure/Failure';
import { Global_Order } from 'src/entities/Global_Order';
import { Sub_Order } from 'src/entities/Sub_Order';
import { Image_Go } from 'src/entities/Image/Image_go';
import { Image_So } from 'src/entities/Image/Image_so';

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
  failureSo: Array<Failure>;
  setupSo: Array<Setup>;
  imageSo: Array<Image_So>;
}
