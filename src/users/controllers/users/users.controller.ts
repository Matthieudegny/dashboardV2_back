import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  Body,
  Param,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  ParseBoolPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDto } from '../../dtos/CreateUser.dto';
import { UsersService } from '../../services/users/users.service';

//api route: /users
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  //méthode
  //route params = @Get(':id')
  @Get()
  getUsers() {
    return this.usersService.fetchUsers();
  }

  @Get('posts')
  getUsersPosts() {
    return { username: 'tonton', emaim: 'tonton@gmail' };
  }

  @Post('create')
  //bien choisir Request de express
  createUser(@Req() request: Request, @Res() response: Response) {
    response.send('created user');
    return { username: 'tonton', emaim: 'xxxxxx@xxxxx' };
  }

  // @Post('create')
  // //UsePipes middleware qui vérifie les conditions de validation ici les champs username, email et password avec CreateUserDto
  // @UsePipes(new ValidationPipe())
  // createUserProtected(@Body() userData: CreateUserDto) {
  //   console.log(userData);
  //   return {};
  // }

  @Post('create')
  //UsePipes middleware qui vérifie les conditions de validation ici les champs username, email et password avec CreateUserDto
  @UsePipes(new ValidationPipe())
  createUserProtected(@Body() userData: CreateUserDto) {
    const result = this.usersService.createUser(userData);
    if (!result)
      throw new HttpException('User not created', HttpStatus.BAD_REQUEST);
  }

  // @Get(':id')
  // GetUserById(@Req() request: Request, @Res() response: Response) {
  //   response.send('created user');
  //   return { username: 'tonton', emaim: 'xxxxxx@xxxxx' };
  // }

  @Get(':id')
  GetUserById(@Param('id', ParseIntPipe) id: string) {
    console.log(id);
    return { id };
  }

  //Query va extarire la valeur du param sortBy ex:/users?sortBy=age
  @Get()
  getUsersSorted(@Query('sortBy') sortBy: string) {
    console.log(sortBy);
    return [{ id: 1, username: 'tonton' }];
  }

  // @Get()
  // //oblige davoir un boolean en param
  // getUsersSorted(@Query('sortDesc',ParseBoolPipe) sortDesc: boolean) {
  //   console.log(sortDesc);
  //   return [{ id: 1, username: 'tonton' }];
  // }
}
