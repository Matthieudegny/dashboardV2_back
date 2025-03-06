import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export class DecimalColumnTransformer {
  to(data: number): number {
    return data;
  }

  from(data: string): number {
    return parseFloat(data);
  }
}

@Entity()
export class User {
  @ApiProperty({
    description: 'The unique identifier of the user',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  idUser: number;

  @ApiProperty({
    description: "User's first name",
    example: 'John',
    maxLength: 45,
  })
  @Column({ length: 45 })
  firstName: string;

  @ApiProperty({
    description: "User's last name",
    example: 'Doe',
    maxLength: 45,
  })
  @Column({ length: 45 })
  lastName: string;

  @ApiProperty({
    description: "User's login/username",
    example: 'john.doe',
    maxLength: 255,
  })
  @Column({ length: 255 })
  login: string;

  @ApiProperty({
    description: "User's password",
    example: '********',
    maxLength: 255,
    writeOnly: true, // This indicates that the property is write-only and should not be returned in responses
  })
  @Column({ length: 255 })
  password: string;

  @ApiProperty({
    description: "User's initial capital amount",
    example: 1000.0,
    minimum: 0,
    type: 'number',
  })
  @Column({
    type: 'int',
    default: 0,
    transformer: new DecimalColumnTransformer(),
  })
  initial_capital_amount: number;
}
