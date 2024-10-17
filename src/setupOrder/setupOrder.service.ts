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
  create(createSetupDto: SetupOrderDto) {
    const newSetup = this.setupOrderRepository.create(createSetupDto);
    return this.setupOrderRepository.save(newSetup);
  }

  findAllSetupGoByIdUser(idUser: number) {
    return this.setupOrderRepository.find({
      where: { setup_Order_idUser: idUser },
    });
  }

  findAll() {
    return this.setupOrderRepository.find();
  }

  findOne(id: number) {
    return this.setupOrderRepository.findOneBy({ setup_Order_id: id });
  }

  update(id: number, updateSetupDto: SetupOrderDto) {
    return this.setupOrderRepository.update(id, updateSetupDto);
  }

  remove(id: number) {
    return this.setupOrderRepository.delete(id);
  }
}
