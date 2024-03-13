import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Setup_so } from '../entities/Setup/Setup_so';
import { SetupSoDto } from './dto/setupSo.dto';

@Injectable()
export class SetupSoService {
  constructor(
    @InjectRepository(Setup_so)
    private setupRepository: Repository<Setup_so>,
  ) {}
  create(createSetupDto: SetupSoDto) {
    console.log('service');
    const newSetup = this.setupRepository.create(createSetupDto);
    return this.setupRepository.save(newSetup);
  }

  findAll() {
    return this.setupRepository.find();
  }

  findOne(id: number) {
    return this.setupRepository.findOneBy({ setup_so_id: id });
  }

  update(id: number, updateSetupDto: SetupSoDto) {
    return this.setupRepository.update(id, updateSetupDto);
  }

  remove(id: number) {
    return this.setupRepository.delete(id);
  }
}
