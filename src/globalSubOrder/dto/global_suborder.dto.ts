import { ApiProperty } from '@nestjs/swagger';
import { Failure_so } from 'src/entities/Failure/Failure_so';
import { Image_Suborder_Add } from 'src/entities/image/Image_Suborder_Add';
import { Image_Suborder_Reduce } from 'src/entities/image/Image_Suborder_Reduce';
import { Setup_SubOrder_Add } from 'src/entities/Setup/Setup_SubOrder_Add';
import { Setup_SubOrder_Reduce } from 'src/entities/Setup/Setup_SubOrder_Reduce';
import { Suborder_Add } from 'src/entities/Suborder_Add';
import { Suborder_Reduce } from 'src/entities/Suborder_Reduce';

export class GlobalSubOrderReducedDto {
  @ApiProperty({ description: 'Sub order', type: Suborder_Reduce })
  subOrder: Suborder_Reduce;

  @ApiProperty({
    description: 'list failureSubOrder',
    type: Failure_so,
    isArray: true,
  })
  failureSubOrderList: Array<Failure_so>;

  @ApiProperty({
    description: 'list setupSubOrder',
    type: Setup_SubOrder_Reduce,
    isArray: true,
  })
  setupSubOrderList: Array<Setup_SubOrder_Reduce>;

  @ApiProperty({
    description: 'list imageSubOrder',
    type: Image_Suborder_Reduce,
    isArray: true,
  })
  imageSubOrderList: Array<Image_Suborder_Reduce>;
}

export class GlobalSubOrderAddDto {
  @ApiProperty({ description: 'Sub order', type: Suborder_Add })
  subOrder: Suborder_Add;

  @ApiProperty({
    description: 'list failureSubOrder',
    type: Failure_so,
    isArray: true,
  })
  failureSubOrderList: Array<Failure_so>;

  @ApiProperty({
    description: 'list setupSubOrder',
    type: Setup_SubOrder_Add,
    isArray: true,
  })
  setupSubOrderList: Array<Setup_SubOrder_Add>;

  @ApiProperty({
    description: 'list imageSubOrder',
    type: Image_Suborder_Add,
    isArray: true,
  })
  imageSubOrderList: Array<Image_Suborder_Add>;
}
