import { ApiProperty } from '@nestjs/swagger';
export class ImageGoDto {
  @ApiProperty()
  image_go_id: number;
  @ApiProperty()
  image_go_go_id: number;
  @ApiProperty()
  image_go_title: string;
  @ApiProperty()
  image_go_content: string;
}
