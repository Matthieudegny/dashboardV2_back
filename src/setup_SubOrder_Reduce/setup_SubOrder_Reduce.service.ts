import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Setup_SubOrder_Reduce } from '../entities/Setup/Setup_SubOrder_Reduce';
import { Setup_SubOrder_ReduceDto } from './dto/setup_SubOrder_Reduce.dto';

@Injectable()
export class Setup_SubOrder_Reduce_Service {
  constructor(
    @InjectRepository(Setup_SubOrder_Reduce)
    private setupSubOrderRepository: Repository<Setup_SubOrder_Reduce>,
  ) {}
  create(createSetupSubOrderDto: Setup_SubOrder_ReduceDto) {
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
      where: { setup_SubOrder_Reduce_idUser: idUser },
    });
  }

  findOne(id: number) {
    return this.setupSubOrderRepository.findOneBy({
      setup_SubOrder_Reduce_id: id,
    });
  }

  update(id: number, updateSetupDto: Setup_SubOrder_ReduceDto) {
    return this.setupSubOrderRepository.update(id, updateSetupDto);
  }

  remove(id: number) {
    return this.setupSubOrderRepository.delete(id);
  }
}
