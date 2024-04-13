import { ApiProperty } from '@nestjs/swagger';
import { Order } from '../../entities/Order';
import { Sub_Order } from '../../entities/Sub_Order';
import { Image_Go } from '../../entities/Image/Image_go';
import { Image_So } from '../../entities/Image/Image_so';
//dto
import { OrderDto } from '../../order/dto/order.dto';
import { FailureGoDto } from '../../failure_go/dtos/failure_go.dto';
import { ImageGoDto } from '../../image_go/dto/image_go.dto';
import { SetupGoDto } from '../../setup_go/dto/setup_go.dto';
import { SubOrderDto } from '../../sub_order/dto/sub_order.dto';
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
  @ApiProperty({ description: 'Global order', type: OrderDto })
  globalOrder: Order;
  @ApiProperty({
    description: 'list failureGo',
    type: FailureGoDto,
    isArray: true,
  })
  failureGo: Array<Failure_go>;
  @ApiProperty({
    description: 'list setupGo',
    type: SetupGoDto,
    isArray: true,
  })
  setupGo: Array<Setup_go>;
  @ApiProperty({
    description: 'list imageGo',
    type: ImageGoDto,
    isArray: true,
  })
  imageGo: Array<Image_Go>;
  @ApiProperty({
    description: 'list subOrder',
    type: SubOrderDto,
    isArray: true,
  })
  globalSubOrderList: Array<SubOrderFillWithDatasDto>;
}

export class SubOrderFillWithDatasDto {
  subOrder: Sub_Order;
  failureSo: Array<Failure_so>;
  setupSo: Array<Setup_so>;
  imageSo: Array<Image_So>;
}
