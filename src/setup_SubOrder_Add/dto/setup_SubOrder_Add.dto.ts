import { ApiProperty } from '@nestjs/swagger';
export class Setup_SubOrder_Add_Dto {
  @ApiProperty()
  setup_SubOrder_Add_id: number;
  @ApiProperty()
  setup_SubOrder_Add_title: string;
  @ApiProperty()
  setup_SubOrder_Add_description: string;
  @ApiProperty()
  setup_SubOrder_Add_idUser: number;
}
