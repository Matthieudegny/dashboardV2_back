import { ApiProperty } from '@nestjs/swagger';
import { Failure_so } from 'src/entities/Failure/Failure_so';
import { Image_Suborder } from 'src/entities/image/Image_Suborder';
import { Setup_SubOrder } from 'src/entities/Setup/Setup_SubOrder';
import { suborder_Type } from '../model/model_type_suborder';
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
    description: 'list setupSubOrder',
    type: Setup_SubOrder,
    isArray: true,
  })
  setupSubOrderList: Array<Setup_SubOrder>;

  @ApiProperty({
    description: 'list imageSubOrder',
    type: Image_Suborder,
    isArray: true,
  })
  imageSubOrderList: Array<Image_Suborder>;

  constructor() {
    this.failureSubOrderList = [];
    this.setupSubOrderList = [];
    this.imageSubOrderList = [];
  }
}
