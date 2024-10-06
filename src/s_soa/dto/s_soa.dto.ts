import { ApiProperty } from '@nestjs/swagger';

export class S_soa_Dto {
  @ApiProperty()
  s_soa_id: number;
  @ApiProperty()
  s_soa_setupOrder_id: number;
  @ApiProperty()
  s_soa_subOrder_id: number;
}
