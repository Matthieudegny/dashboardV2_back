import { ApiProperty } from '@nestjs/swagger';
export class Ss_SoDto {
  @ApiProperty()
  ss_so_id: number;
  @ApiProperty()
  ss_so_setup_so_id: number;
  @ApiProperty()
  ss_so_so_id: number;
}
