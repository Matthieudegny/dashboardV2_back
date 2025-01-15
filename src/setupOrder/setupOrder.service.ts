import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Setup_Order } from '../entities/Setup/SetupOrder';
import { SetupOrderDto } from './dto/setup_go.dto';

@Injectable()
export class SetupOrderService {
  constructor(
    @InjectRepository(Setup_Order)
    private setupOrderRepository: Repository<Setup_Order>,
  ) {}
  async create(createSetupDto: SetupOrderDto) {
    try {
      const newSetup = this.setupOrderRepository.create(createSetupDto);
      const repsonse = await this.setupOrderRepository.save(newSetup);
      return repsonse;
    } catch (error) {
      console.log(error);
    }
  }

  findAllSetupGoByIdUser(idUser: number) {
    try {
      return this.setupOrderRepository.find({
        where: { setup_Order_idUser: idUser },
      });
    } catch (error) {
      console.log(error);
    }
  }

  findAll() {
    try {
      return this.setupOrderRepository.find();
    } catch (error) {
      console.log(error);
    }
  }

  findOne(id: number) {
    try {
      return this.setupOrderRepository.findOneBy({ setup_Order_id: id });
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: number, updateSetupDto: SetupOrderDto) {
    console.log('updateSetupDto', updateSetupDto);
    try {
      const response = await this.setupOrderRepository.update(
        id,
        updateSetupDto,
      );
      if (response.affected === 0) {
        throw new Error('Setup order not found');
      }
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  remove(id: number) {
    try {
      return this.setupOrderRepository.delete(id);
    } catch (error) {
      console.log(error);
    }
  }
}
