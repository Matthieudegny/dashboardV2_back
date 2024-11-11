import { ApiProperty } from '@nestjs/swagger';
export class Setup_SubOrderDto {
  @ApiProperty()
  setup_SubOrder_id: number;
  @ApiProperty()
  setup_SubOrder_title: string;
  @ApiProperty()
  setup_SubOrder_description: string;
  @ApiProperty()
  setup_SubOrder_idUser: number;

  constructor() {
    this.setup_SubOrder_id = 0;
    this.setup_SubOrder_title = '';
    this.setup_SubOrder_description = '';
    this.setup_SubOrder_idUser = 0;
  }
}
