import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  //oblige l'objet davoir une valuer non vide pour le champs username
  id: number;
  @IsNotEmpty()
  username: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
