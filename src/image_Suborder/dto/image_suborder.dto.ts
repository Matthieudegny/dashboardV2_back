import { ApiProperty } from '@nestjs/swagger';
export class Image_SuborderDto {
  @ApiProperty()
  image_Suborder_id: number;
  @ApiProperty()
  image_Suborder_subOrder_id: number;
  @ApiProperty()
  image_Suborder_title: string;
  @ApiProperty()
  image_Suborder_description: string;
  @ApiProperty()
  image_Suborder_contentImage: string;

  constructor() {
    this.image_Suborder_contentImage = '';
    this.image_Suborder_description = '';
    this.image_Suborder_title = '';
    this.image_Suborder_id = 0;
    this.image_Suborder_subOrder_id = 0;
  }
}
