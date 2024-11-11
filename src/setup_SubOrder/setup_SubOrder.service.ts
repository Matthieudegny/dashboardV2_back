import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Setup_SubOrder } from '../entities/Setup/Setup_SubOrder';
import { Setup_SubOrderDto } from './dto/setup_SubOrder.dto';

@Injectable()
export class Setup_SubOrder_Service {
  constructor(
    @InjectRepository(Setup_SubOrder)
    private setupSubOrderRepository: Repository<Setup_SubOrder>,
  ) {}
  create(createSetupSubOrderDto: Setup_SubOrderDto) {
    const newSetup = this.setupSubOrderRepository.create(
      createSetupSubOrderDto,
    );
    return this.setupSubOrderRepository.save(newSetup);
  }

  findAll() {
    return this.setupSubOrderRepository.find();
  }

  findAllSubOrderSetupSetupByIdUser(idUser: number) {
    return this.setupSubOrderRepository.find({
      where: { setup_SubOrder_idUser: idUser },
    });
  }

  findOne(id: number) {
    return this.setupSubOrderRepository.findOneBy({
      setup_SubOrder_id: id,
    });
  }

  update(id: number, updateSetupDto: Setup_SubOrderDto) {
    return this.setupSubOrderRepository.update(id, updateSetupDto);
  }

  remove(id: number) {
    return this.setupSubOrderRepository.delete(id);
  }
}
