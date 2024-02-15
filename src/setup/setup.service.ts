import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Setup } from '../entities/Setup/Setup';
import { SetupDto } from './dto/setup.dto';

@Injectable()
export class SetupService {
  constructor(
    @InjectRepository(Setup)
    private setupRepository: Repository<Setup>,
  ) {}
  create(createSetupDto: SetupDto) {
    const newSetup = this.setupRepository.create(createSetupDto);
    return this.setupRepository.save(newSetup);
  }

  findAll() {
    return this.setupRepository.find();
  }

  findOne(id: number) {
    return this.setupRepository.findOneBy({ setup_id: id });
  }

  update(id: number, updateSetupDto: SetupDto) {
    return this.setupRepository.update(id, updateSetupDto);
  }

  remove(id: number) {
    return this.setupRepository.delete(id);
  }
}
