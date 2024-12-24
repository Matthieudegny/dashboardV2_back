import { ApiProperty } from '@nestjs/swagger';

export class CategorySetupSubOrderDto {
  @ApiProperty()
  category_setup_subOrder_id: number;
  @ApiProperty()
  category_setup_subOrder_idUser: number;
  @ApiProperty()
  category_setup_subOrder_name: string;
  @ApiProperty()
  category_setup_subOrder_description: string;

  constructor() {
    this.category_setup_subOrder_id = 0;
    this.category_setup_subOrder_idUser = 0;
    this.category_setup_subOrder_name = '';
    this.category_setup_subOrder_description = '';
  }
}
