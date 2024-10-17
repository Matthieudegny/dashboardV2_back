import { ApiProperty } from '@nestjs/swagger';
export class ImageOrderDto {
  @ApiProperty()
  image_Order_id: number;
  @ApiProperty()
  image_Order_order_id: number;
  @ApiProperty()
  image_Order_title: string;
  @ApiProperty()
  image_Order_description: string;
  @ApiProperty()
  image_Order_contentImage: string;
}
