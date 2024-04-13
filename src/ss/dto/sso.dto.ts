import { ApiProperty } from '@nestjs/swagger';
export class SsoDto {
  @ApiProperty()
  sso_id: number;
  @ApiProperty()
  sso_setup_so_id: number;
  @ApiProperty()
  sso_so_id: number;
}
