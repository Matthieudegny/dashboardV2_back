import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Setup_go } from '../entities/Setup/Setup_go';
import { SetupGoDto } from './dto/setup_go.dto';

@Injectable()
export class SetupGoService {
  constructor(
    @InjectRepository(Setup_go)
    private setupRepository: Repository<Setup_go>,
  ) {}
  create(createSetupDto: SetupGoDto) {
    console.log('service');
    const newSetup = this.setupRepository.create(createSetupDto);
    return this.setupRepository.save(newSetup);
  }

  findAllSetupGoByIdUser(idUser: number) {
    return this.setupRepository.find({
      where: { setup_go_idUser: idUser },
    });
  }

  findAll() {
    return this.setupRepository.find();
  }

  findOne(id: number) {
    return this.setupRepository.findOneBy({ setup_go_id: id });
  }

  update(id: number, updateSetupDto: SetupGoDto) {
    return this.setupRepository.update(id, updateSetupDto);
  }

  remove(id: number) {
    return this.setupRepository.delete(id);
  }
}
