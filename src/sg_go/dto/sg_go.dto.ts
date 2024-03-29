import { ApiProperty } from '@nestjs/swagger';

export class Sg_GoDto {
  @ApiProperty()
  sg_go_id: number;
  @ApiProperty()
  sg_go_setup_go_id: number;
  @ApiProperty()
  sg_go_go_id: number;
}
