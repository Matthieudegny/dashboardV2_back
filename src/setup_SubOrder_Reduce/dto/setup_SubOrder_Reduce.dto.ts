import { ApiProperty } from '@nestjs/swagger';
export class Setup_SubOrder_ReduceDto {
  @ApiProperty()
  setup_SubOrder_Reduce_id: number;
  @ApiProperty()
  setup_SubOrder_Reduce_title: string;
  @ApiProperty()
  setup_SubOrder_Reduce_description: string;
  @ApiProperty()
  setup_SubOrder_Reduce_idUser: number;
}
