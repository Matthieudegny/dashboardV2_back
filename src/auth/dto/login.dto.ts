import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class LoginDto {
  @ApiProperty({ description: 'Login name' })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({ description: 'User password' })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class AccessTokenResponseDto {
  access_token: string;
  idUser: number;
  firstName: string;
  lastName: string;
}
