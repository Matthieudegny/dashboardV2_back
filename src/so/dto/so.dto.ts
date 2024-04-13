import { ApiProperty } from '@nestjs/swagger';

export class SoDto {
  @ApiProperty()
  so_id: number;
  @ApiProperty()
  so_setup_go_id: number;
  @ApiProperty()
  so_go_id: number;
}
