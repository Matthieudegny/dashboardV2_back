import { ApiProperty } from '@nestjs/swagger';
import { Order } from '../../entities/Order';
import { Sub_Order } from '../../entities/Sub_Order';
import { Image_Order } from '../../entities/image/ImageOrder';
import { Image_SubOrder } from '../../entities/image/ImageSubOrder';
//dto
import { OrderDto } from '../../order/dto/order.dto';
import { FailureGoDto } from '../../failure_go/dtos/failure_go.dto';
import { ImageOrderDto } from '../../imageOrder/dto/imageOrder.dto';
import { SetupOrderDto } from '../../setupOrder/dto/setup_go.dto';
import { SubOrderDto } from '../../sub_order/dto/sub_order.dto';
//failure
import { Failure_go } from '../../entities/Failure/Failure_go';
import { Failure_so } from '../../entities/Failure/Failure_so';
//setup
import { SetupOrder } from '../../entities/Setup/SetupOrder';
import { SetupSubOrder } from '../../entities/Setup/SetupSubOrder';

export class MainDatasDto {
  globalOrderList: Array<GlobalOrderDto>;
  setupOrderList: Array<SetupOrder>;
  setupSubOrderList: Array<SetupSubOrder>;
  failureOrderList: Array<Failure_go>;
  failureSubOrderList: Array<Failure_so>;
}

export class GlobalOrderDto {
  @ApiProperty({ description: 'Global order', type: OrderDto })
  order: Order;
  @ApiProperty({
    description: 'list failureOrder',
    type: FailureGoDto,
    isArray: true,
  })
  failureOrderList: Array<Failure_go>;
  @ApiProperty({
    description: 'list setupOrder',
    type: SetupOrderDto,
    isArray: true,
  })
  setupOrderList: Array<SetupOrder>;
  @ApiProperty({
    description: 'list imageOrder',
    type: ImageOrderDto,
    isArray: true,
  })
  imageOrderList: Array<Image_Order>;
  @ApiProperty({
    description: 'list subOrder',
    type: SubOrderDto,
    isArray: true,
  })
  globalSubOrderList: Array<GlobalSubOrderDto>;
}

export class GlobalSubOrderDto {
  subOrder: Sub_Order;
  failureSubOrderList: Array<Failure_so>;
  setupSubOrderList: Array<SetupSubOrder>;
  imageSubOrderList: Array<Image_SubOrder>;
}
