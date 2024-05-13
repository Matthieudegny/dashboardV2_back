import { ApiProperty } from '@nestjs/swagger';
export class SsoDto {
  @ApiProperty()
  sso_id: number;
  @ApiProperty()
  sso_setupSubOrder_id: number;
  @ApiProperty()
  sso_subOrder_id: number;
}
