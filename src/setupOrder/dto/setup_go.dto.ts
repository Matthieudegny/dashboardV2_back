import { ApiProperty } from '@nestjs/swagger';
export class SetupOrderDto {
  @ApiProperty()
  setup_Order_id: number;
  @ApiProperty()
  setup_Order_title: string;
  @ApiProperty()
  setup_Order_description: string;
  @ApiProperty()
  setup_Order_idUser: number;
}
