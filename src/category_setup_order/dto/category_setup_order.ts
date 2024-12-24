import { ApiProperty } from '@nestjs/swagger';

export class CategorySetupOrderDto {
  @ApiProperty()
  category_setup_order_id: number;
  @ApiProperty()
  category_setup_order_idUser: number;
  @ApiProperty()
  category_setup_order_name: string;
  @ApiProperty()
  category_setup_order_description: string;

  constructor() {
    this.category_setup_order_id = 0;
    this.category_setup_order_idUser = 0;
    this.category_setup_order_name = '';
    this.category_setup_order_description = '';
  }
}
