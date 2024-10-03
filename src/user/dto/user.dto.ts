import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserDto {
  idUser: number;

  @ApiProperty({ example: 'John', description: 'First Name' })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'Last Name' })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({ example: 'Login', description: 'Login' })
  @IsNotEmpty()
  @IsString()
  login: string;

  @ApiProperty({ example: 'Password', description: 'Password' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
