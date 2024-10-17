import { ApiProperty } from '@nestjs/swagger';
export class S_sor_Dto {
  @ApiProperty()
  s_sor_id: number;
  @ApiProperty()
  s_sor_setupSubOrder_id: number;
  @ApiProperty()
  s_sor_subOrder_Reduce_id: number;
}
