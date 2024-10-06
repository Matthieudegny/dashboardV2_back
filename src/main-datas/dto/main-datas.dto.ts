import { ApiProperty } from '@nestjs/swagger';
import { Order } from '../../entities/Order';
import { Sub_Order_Reduce } from '../../entities/Sub_Order_Reduce';
import { Image_Order } from '../../entities/image/ImageOrder';
import { Image_SubOrder } from '../../entities/image/ImageSubOrder';
//dto
import { OrderDto } from '../../order/dto/order.dto';
import { FailureGoDto } from '../../failure_go/dtos/failure_go.dto';
import { ImageOrderDto } from '../../imageOrder/dto/imageOrder.dto';
import { SetupOrderDto } from '../../setupOrder/dto/setup_go.dto';
import { Sub_Order_Reduce_Dto } from '../../sub_order/sub_order_reduce/dto/sub_order_reduce.dto';
//failure
import { Failure_go } from '../../entities/Failure/Failure_go';
import { Failure_so } from '../../entities/Failure/Failure_so';
//setup
import { SetupOrder } from '../../entities/Setup/SetupOrder';
import { SetupSubOrder } from '../../entities/Setup/SetupSubOrder';
import { Sub_Order_Add } from 'src/entities/Sub_Order_Add';

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
    type: Sub_Order_Reduce_Dto,
    isArray: true,
  })
  globalSubOrderList: Array<GlobalSubOrderDto>;
}

export class GlobalSubOrderDto {
  subOrder: Sub_Order_Reduce | Sub_Order_Add;
  failureSubOrderList: Array<Failure_so>;
  setupSubOrderList: Array<SetupSubOrder>;
  imageSubOrderList: Array<Image_SubOrder>;
}
