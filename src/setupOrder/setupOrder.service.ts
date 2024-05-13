import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SetupOrder } from '../entities/Setup/SetupOrder';
import { SetupOrderDto } from './dto/setup_go.dto';

@Injectable()
export class SetupOrderService {
  constructor(
    @InjectRepository(SetupOrder)
    private setupOrderRepository: Repository<SetupOrder>,
  ) {}
  create(createSetupDto: SetupOrderDto) {
    const newSetup = this.setupOrderRepository.create(createSetupDto);
    return this.setupOrderRepository.save(newSetup);
  }

  findAllSetupGoByIdUser(idUser: number) {
    return this.setupOrderRepository.find({
      where: { setupOrder_idUser: idUser },
    });
  }

  findAll() {
    return this.setupOrderRepository.find();
  }

  findOne(id: number) {
    return this.setupOrderRepository.findOneBy({ setupOrder_id: id });
  }

  update(id: number, updateSetupDto: SetupOrderDto) {
    return this.setupOrderRepository.update(id, updateSetupDto);
  }

  remove(id: number) {
    return this.setupOrderRepository.delete(id);
  }
}
