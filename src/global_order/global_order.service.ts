import { Injectable } from '@nestjs/common';
import { GlobalOrderDto } from './dto/global_order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Global_Order } from '../entities/Global_Order';
@Injectable()
export class GlobalOrderService {
  constructor(
    @InjectRepository(Global_Order)
    private globalOrderRepository: Repository<Global_Order>,
  ) {}
  create(createGlobalOrderDto: GlobalOrderDto) {
    const newGlobalOrder =
      this.globalOrderRepository.create(createGlobalOrderDto);
    return this.globalOrderRepository.save(newGlobalOrder);
  }

  findAll() {
    return this.globalOrderRepository.find();
  }

  findOne(id: number) {
    return this.globalOrderRepository.findOneBy({ go_id: id });
  }

  update(id: number, updateGlobalOrderDto: GlobalOrderDto) {
    return this.globalOrderRepository.update(id, updateGlobalOrderDto);
  }

  remove(id: number) {
    return this.globalOrderRepository.delete(id);
  }
}
