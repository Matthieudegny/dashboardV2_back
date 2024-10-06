import { ApiProperty } from '@nestjs/swagger';
export class Image_Suborder_AddDto {
  @ApiProperty()
  image_Suborder_add_id: number;
  @ApiProperty()
  image_Suborder_add_subOrder_add_id: number;
  @ApiProperty()
  image_Suborder_add_title: string;
  @ApiProperty()
  image_Suborder_add_description: string;
  @ApiProperty()
  image_Suborder_add_contentImage: string;
}
