import { ApiProperty } from '@nestjs/swagger';
export class SetupSoDto {
  @ApiProperty()
  setupSubOrder_id: number;
  @ApiProperty()
  setupSubOrder_title: string;
  @ApiProperty()
  setupSubOrder_description: string;
  @ApiProperty()
  setupSubOrder_idUser: number;
}
