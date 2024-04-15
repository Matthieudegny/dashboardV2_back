import { ApiProperty } from '@nestjs/swagger';
export class ImageOrderDto {
  @ApiProperty()
  imageOrder_id: number;
  @ApiProperty()
  imageOrder_order_id: number;
  @ApiProperty()
  imageOrder_title: string;
  @ApiProperty()
  imageOrder_description: string;
  @ApiProperty()
  imageOrder_contentImage: string;
}
