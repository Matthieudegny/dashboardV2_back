import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/User';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  create(createUserDto: UserDto) {
    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOne({ where: { idUser: id } });
  }

  async update(id: number, updateUserDto: UserDto) {
    const userToUpdate = await this.userRepository.findOne({
      where: { idUser: id },
    });
    const updatedUser = this.userRepository.create({
      ...userToUpdate,
      ...updateUserDto,
    });
    return this.userRepository.save(updatedUser);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
