import { ApiProperty } from '@nestjs/swagger';
import { Failure_so } from 'src/entities/Failure/Failure_so';
import { Image_Suborder } from 'src/entities/image/Image_Suborder';
import { Setup_Order } from 'src/entities/Setup/SetupOrder';
import { Suborder } from 'src/entities/Suborder';
import { Suborder_Dto } from 'src/sub_order/dto/suborder.dto';

export class GlobalSubOrderDto {
  @ApiProperty({ description: 'Sub order', type: Suborder_Dto })
  subOrder: Suborder_Dto;

  @ApiProperty({
    description: 'list failureSubOrder',
    type: Failure_so,
    isArray: true,
  })
  failureSubOrderList: Array<Failure_so>;

  @ApiProperty({
    description: 'list imageSubOrder',
    type: Image_Suborder,
    isArray: true,
  })
  imageSubOrderList: Array<Image_Suborder>;

  constructor() {
    this.failureSubOrderList = [];
    this.imageSubOrderList = [];
  }
}
