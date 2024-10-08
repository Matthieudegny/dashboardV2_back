import { ApiProperty } from '@nestjs/swagger';
import { Order } from '../../entities/Order';
import { Image_Order } from '../../entities/image/ImageOrder';
import { Image_Suborder_Reduce } from '../../entities/image/Image_Suborder_Reduce';
import { Image_Suborder_Add } from '../../entities/image/Image_Suborder_Add';
//dto
import { OrderDto } from '../../order/dto/order.dto';
import { FailureGoDto } from '../../failure_go/dtos/failure_go.dto';
import { ImageOrderDto } from '../../imageOrder/dto/imageOrder.dto';
import { SetupOrderDto } from '../../setupOrder/dto/setup_go.dto';
import { Suborder_Reduce_Dto } from '../../sub_order/sub_order_reduce/dto/suborder_Reduce.dto';
import { GlobalSubOrderReducedDto } from 'src/globalSubOrder/dto/global_suborder.dto';
import { GlobalSubOrderAddDto } from 'src/globalSubOrder/dto/global_suborder.dto';
//failure
import { Failure_go } from '../../entities/Failure/Failure_go';
import { Failure_so } from '../../entities/Failure/Failure_so';
//setup
import { Setup_Order } from '../../entities/Setup/SetupOrder';
import { Setup_SubOrder_Add } from 'src/entities/Setup/Setup_SubOrder_Add';
import { Setup_SubOrder_Reduce } from 'src/entities/Setup/Setup_SubOrder_Reduce';

export class MainDatasDto {
  globalOrderList: Array<GlobalOrderDto>;
  setupOrderList: Array<Setup_Order>;
  setupSubOrderList: Array<Setup_SubOrder_Add | Setup_SubOrder_Reduce>;
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
