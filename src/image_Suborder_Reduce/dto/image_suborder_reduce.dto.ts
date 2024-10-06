import { ApiProperty } from '@nestjs/swagger';
export class Image_Suborder_ReduceDto {
  @ApiProperty()
  image_Suborder_reduce_id: number;
  @ApiProperty()
  image_Suborder_reduce_subOrder_reduce_id: number;
  @ApiProperty()
  image_Suborder_reduce_title: string;
  @ApiProperty()
  image_Suborder_reduce_description: string;
  @ApiProperty()
  image_Suborder_reduce_contentImage: string;
}
