import { ApiProperty } from '@nestjs/swagger';
export class SetupGoDto {
  @ApiProperty()
  setup_go_id: number;
  @ApiProperty()
  setup_go_title: string;
  @ApiProperty()
  setup_go_description: string;
  @ApiProperty()
  setup_go_idUser: number;
}
