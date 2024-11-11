import { ApiProperty } from '@nestjs/swagger';
export class S_so_Dto {
  @ApiProperty()
  s_so_id: number;
  @ApiProperty()
  s_so_setupSubOrder_id: number;
  @ApiProperty()
  s_so_subOrder_Reduce_id: number;

  constructor() {
    this.s_so_id = 0;
    this.s_so_setupSubOrder_id = 0;
    this.s_so_subOrder_Reduce_id = 0;
  }
}
