import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/Login.dto';
import { SignUpDto } from './dto/signUp.dto';
import { UserDto } from '../user/dto/user.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    console.log(loginDto);
    return this.authService.findByLogin(loginDto);
  }

  @Post('signup')
  create(@Body() signUpDto: UserDto) {
    return this.userService.create(signUpDto);
  }
}
