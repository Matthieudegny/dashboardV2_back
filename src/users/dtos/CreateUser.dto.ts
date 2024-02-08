import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  //oblige l'objet davoir une valuer non vide pour le champs username
  @IsNotEmpty()
  username: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  password: string;
}
