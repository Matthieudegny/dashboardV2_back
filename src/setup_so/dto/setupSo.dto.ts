import { ApiProperty } from '@nestjs/swagger';
export class SetupSoDto {
  @ApiProperty()
  setup_so_id: number;
  @ApiProperty()
  setup_so_title: string;
  @ApiProperty()
  setup_so_description: string;
  @ApiProperty()
  setup_so_idUser: number;
}
