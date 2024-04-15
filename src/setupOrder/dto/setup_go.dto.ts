import { ApiProperty } from '@nestjs/swagger';
export class SetupOrderDto {
  @ApiProperty()
  setupOrder_id: number;
  @ApiProperty()
  setupOrder_title: string;
  @ApiProperty()
  setupOrder_description: string;
  @ApiProperty()
  setupOrder_idUser: number;
}
