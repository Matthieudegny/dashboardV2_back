import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Setup_SubOrder_Add } from '../entities/Setup/Setup_SubOrder_Add';
import { Setup_SubOrder_Add_Dto } from './dto/setup_SubOrder_Add.dto';

@Injectable()
export class Setup_SubOrder_Add_Service {
  constructor(
    @InjectRepository(Setup_SubOrder_Add)
    private setupSubOrderRepository: Repository<Setup_SubOrder_Add>,
  ) {}
  create(createSetupSubOrderDto: Setup_SubOrder_Add_Dto) {
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
      where: { setup_SubOrder_Add_idUser: idUser },
    });
  }

  findOne(id: number) {
    return this.setupSubOrderRepository.findOneBy({
      setup_SubOrder_Add_id: id,
    });
  }

  update(id: number, updateSetupDto: Setup_SubOrder_Add_Dto) {
    return this.setupSubOrderRepository.update(id, updateSetupDto);
  }

  remove(id: number) {
    return this.setupSubOrderRepository.delete(id);
  }
}
