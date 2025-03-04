import { Injectable, NotFoundException } from '@nestjs/common';
import { PublicUserDto, UserDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/User';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  create(createUserDto: UserDto) {
    try {
      const newUser = this.userRepository.create(createUserDto);
      return this.userRepository.save(newUser);
    } catch (error) {
      console.log('Error in UserService.create', error);
      throw error;
    }
  }

  findAll() {
    try {
      return this.userRepository.find();
    } catch (error) {
      console.log('Error in UserService.findAll', error);
      throw error;
    }
  }

  async findOne(id: number): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: { idUser: id },
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      console.log('acces user', user);
      return user;
    } catch (error) {
      console.log('Error in UserService.findOne', error);
      throw error;
    }
  }

  updateUser(id: number, updateUserDto: UserDto) {
    try {
      return this.userRepository.update(id, updateUserDto);
    } catch (error) {
      console.log('Error in UserService.updateUser', error);
      throw error;
    }
  }

  remove(id: number) {
    try {
      return this.userRepository.delete(id);
    } catch (error) {
      console.log('Error in UserService.remove', error);
      throw error;
    }
  }

  findInitialCapitalAmountByIdUser(id: number): Promise<number> {
    try {
      return this.userRepository
        .findOne({ where: { idUser: id } })
        .then((user) => {
          return user.initial_capital_amount;
        });
    } catch (error) {
      console.log(
        'Error in UserService.findInitialCapitalAmountByIdUser',
        error,
      );
      throw error;
    }
  }

  findUserInfosByIdUser(id: number): Promise<PublicUserDto> {
    try {
      return this.userRepository
        .findOne({ where: { idUser: id } })
        .then((user) => {
          return {
            idUser: user.idUser,
            firstName: user.firstName,
            lastName: user.lastName,
            initial_capital_amount: user.initial_capital_amount,
          } as PublicUserDto;
        });
    } catch (error) {
      console.log('Error in UserService.findUserInfosByIdUser', error);
      throw error;
    }
  }

  async updateInitialCapitalAmount(
    id: number,
    initial_capital_amount: number,
  ): Promise<boolean> {
    try {
      const result = await this.userRepository
        .createQueryBuilder()
        .update(User)
        .set({ initial_capital_amount })
        .where('idUser = :id', { id })
        .execute();

      return result.affected > 0;
    } catch (error) {
      console.error('Error updating initial capital amount:', error);
      throw error;
    }
  }
}
