import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SetupSoDto } from './dto/setup_so.dto';
import { Setup_So } from '../entities/Setup/Setup_so';

@Injectable()
export class SetupSoService {
  constructor(
    @InjectRepository(Setup_So)
    private setupSoRepository: Repository<Setup_So>,
  ) {}
  create(createSetupSoDto: SetupSoDto) {
    const newSetupSo = this.setupSoRepository.create(createSetupSoDto);
    return this.setupSoRepository.save(newSetupSo);
  }

  findAll() {
    return this.setupSoRepository.find();
  }

  findOne(id: number) {
    return this.setupSoRepository.findOneBy({ setup_so_id: id });
  }

  update(id: number, updateSetupSoDto: SetupSoDto) {
    return this.setupSoRepository.update(id, updateSetupSoDto);
  }

  remove(id: number) {
    return this.setupSoRepository.delete(id);
  }
}
