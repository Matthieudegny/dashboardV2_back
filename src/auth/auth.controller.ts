import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { Public } from '../public.decorator';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { LoginDto, AccessTokenResponseDto } from './dto/Login.dto';
import { UnauthorizedException } from '@nestjs/common';
import { UserDto } from '../user/dto/user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}
  @ApiBody({ type: LoginDto })
  @Public()
  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
  ): Promise<AccessTokenResponseDto | UnauthorizedException> {
    console.log(loginDto);
    return this.authService.findByLogin(loginDto);
  }

  @Post('signup')
  create(@Body() signUpDto: UserDto) {
    return this.userService.create(signUpDto);
  }
}
