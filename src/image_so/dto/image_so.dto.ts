import { ApiProperty } from '@nestjs/swagger';
export class ImageSoDto {
  @ApiProperty()
  image_so_id: number;
  @ApiProperty()
  image_so_so_id: number;
  @ApiProperty()
  image_so_title: string;
  @ApiProperty()
  image_so_description: string;
  @ApiProperty()
  image_so_contentImage: string;
}
