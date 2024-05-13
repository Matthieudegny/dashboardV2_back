import { ApiProperty } from '@nestjs/swagger';

export class SoDto {
  @ApiProperty()
  so_id: number;
  @ApiProperty()
  so_setupOrder_id: number;
  @ApiProperty()
  so_order_id: number;
}
