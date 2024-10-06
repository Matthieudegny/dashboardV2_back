import { ApiProperty } from '@nestjs/swagger';

export class S_o_Dto {
  @ApiProperty()
  s_o_id: number;
  @ApiProperty()
  s_o_setupOrder_id: number;
  @ApiProperty()
  s_o_order_id: number;
}
