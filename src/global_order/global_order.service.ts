import { Injectable } from '@nestjs/common';
import { CreateGlobalOrderDto } from './dto/create-global_order.dto';
import { UpdateGlobalOrderDto } from './dto/update-global_order.dto';

@Injectable()
export class GlobalOrderService {
  create(createGlobalOrderDto: CreateGlobalOrderDto) {
    return 'This action adds a new globalOrder';
  }

  findAll() {
    return `This action returns all globalOrder`;
  }

  findOne(id: number) {
    return `This action returns a #${id} globalOrder`;
  }

  update(id: number, updateGlobalOrderDto: UpdateGlobalOrderDto) {
    return `This action updates a #${id} globalOrder`;
  }

  remove(id: number) {
    return `This action removes a #${id} globalOrder`;
  }
}
