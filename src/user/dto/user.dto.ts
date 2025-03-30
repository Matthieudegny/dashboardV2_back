import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class UserDto {
  @ApiProperty({ example: 1, description: 'User ID' })
  @IsNumber()
  idUser: number;

  @ApiProperty({ example: 'John', description: 'First name' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'Last name' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: 'johndoe', description: 'Login username' })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({ example: 'password123', description: 'User password' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 1000.0,
    description: 'Initial capital amount',
    type: Number,
  })
  @IsNumber()
  initial_capital_amount: number;

  @ApiProperty({
    example: 11,
    description: 'Pagination limit',
    type: Number,
  })
  @IsNumber()
  pagination_limit: number;
}

export class PublicUserDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  idUser: number;

  @ApiProperty({ example: 'John' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  lastName: string;

  @ApiProperty({
    example: 1000.0,
    type: Number,
  })
  @IsNumber()
  initial_capital_amount: number;

  @ApiProperty({
    example: 11,
    type: Number,
  })
  @IsNumber()
  pagination_limit: number;
}
