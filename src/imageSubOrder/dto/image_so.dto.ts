import { ApiProperty } from '@nestjs/swagger';
export class ImageSubOrderDto {
  @ApiProperty()
  imageSubOrder_id: number;
  @ApiProperty()
  imageSubOrder_subOrder_id: number;
  @ApiProperty()
  imageSubOrder_title: string;
  @ApiProperty()
  imageSubOrder_description: string;
  @ApiProperty()
  imageSubOrder_contentImage: string;
}
