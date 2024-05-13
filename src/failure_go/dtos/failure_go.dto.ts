import { ApiProperty } from '@nestjs/swagger';
export class FailureGoDto {
  @ApiProperty()
  failure_go_id: number;
  @ApiProperty()
  failure_go_title: string;
  @ApiProperty()
  failure_go_description: string;
  @ApiProperty()
  failure_go_idUser: number;
}
