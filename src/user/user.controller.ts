import { ApiTags, ApiBody } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { User } from 'src/entities/User';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiBody({ type: UserDto })
  create(@Body() createUserDto: UserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UserDto) {
    return this.userService.updateUser(+id, updateUserDto);
  }

  @Patch('updateInitialCapitalAmount/:id/:amount')
  updateInitialCapitalAmount(
    @Param('id') id: string,
    @Param('amount') amount: string,
  ): Promise<boolean> {
    return this.userService.updateInitialCapitalAmount(+id, +amount);
  }

  @Patch('updatePaginationLimit/:id/:limit')
  updatePaginationLimit(
    @Param('id') id: string,
    @Param('limit') limit: string,
  ): Promise<boolean> {
    return this.userService.updatePaginationLimit(+id, +limit);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
