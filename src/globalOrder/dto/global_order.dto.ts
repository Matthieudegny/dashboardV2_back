import { ApiProperty } from '@nestjs/swagger';
import { Order } from 'src/entities/Order';
import { ImageOrderDto } from 'src/imageOrder/dto/imageOrder.dto';
import { Setup_Order } from 'src/entities/Setup/SetupOrder';
import { SetupOrderDto } from 'src/setupOrder/dto/setup_go.dto';
import { Image_Order } from 'src/entities/image/ImageOrder';
import { OrderDto } from 'src/order/dto/order.dto';
import { Failure_go } from 'src/entities/Failure/Failure_go';
import { FailureGoDto } from 'src/failure_go/dtos/failure_go.dto';
import {
  GlobalSubOrderReducedDto,
  GlobalSubOrderAddDto,
} from 'src/globalSubOrder/dto/global_suborder.dto';

export class GlobalOrderDto {
  @ApiProperty({ description: 'Order', type: OrderDto })
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
  setupOrderList: Array<Setup_Order>;

  @ApiProperty({
    description: 'list imageOrder',
    type: ImageOrderDto,
    isArray: true,
  })
  imageOrderList: Array<Image_Order>;

  @ApiProperty({
    description: 'list subOrder',
    type: Array<GlobalSubOrderReducedDto | GlobalSubOrderAddDto>,
    isArray: true,
  })
  globalSubOrderList: Array<GlobalSubOrderReducedDto | GlobalSubOrderAddDto>;
}
