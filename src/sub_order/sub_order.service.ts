import { Injectable } from '@nestjs/common';
import { SubOrderDto } from './dto/sub_order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sub_Order } from '../entities/Sub_Order';

@Injectable()
export class SubOrderService {
  constructor(
    @InjectRepository(Sub_Order)
    private subOrderRepository: Repository<Sub_Order>,
  ) {}
  create(createSubOrderDto: SubOrderDto) {
    const newSubOrder = this.subOrderRepository.create(createSubOrderDto);
    return this.subOrderRepository.save(newSubOrder);
  }

  findAll() {
    return this.subOrderRepository.find();
  }

  findOne(id: number) {
    return this.subOrderRepository.findOneBy({ so_id: id });
  }

  update(id: number, updateSubOrderDto: SubOrderDto) {
    return this.subOrderRepository.update(id, updateSubOrderDto);
  }

  remove(id: number) {
    return this.subOrderRepository.delete(id);
  }
}
