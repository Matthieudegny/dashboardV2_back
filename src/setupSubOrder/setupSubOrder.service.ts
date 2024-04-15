import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SetupSubOrder } from '../entities/Setup/SetupSubOrder';
import { SetupSoDto } from './dto/setupSubOrder.dto';

@Injectable()
export class SetupSubOrderService {
  constructor(
    @InjectRepository(SetupSubOrder)
    private setupSubOrderRepository: Repository<SetupSubOrder>,
  ) {}
  create(createSetupSubOrderDto: SetupSoDto) {
    const newSetup = this.setupSubOrderRepository.create(
      createSetupSubOrderDto,
    );
    return this.setupSubOrderRepository.save(newSetup);
  }

  findAll() {
    return this.setupSubOrderRepository.find();
  }

  findAllSetupSoByIdUser(idUser: number) {
    return this.setupSubOrderRepository.find({
      where: { setupSubOrder_idUser: idUser },
    });
  }

  findOne(id: number) {
    return this.setupSubOrderRepository.findOneBy({ setupSubOrder_id: id });
  }

  update(id: number, updateSetupDto: SetupSoDto) {
    return this.setupSubOrderRepository.update(id, updateSetupDto);
  }

  remove(id: number) {
    return this.setupSubOrderRepository.delete(id);
  }
}
