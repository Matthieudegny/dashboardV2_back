import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Setup_Go } from '../entities/Setup/Setup_go';
import { SetupGoDto } from './dto/setup_go.dto';

@Injectable()
export class SetupGoService {
  constructor(
    @InjectRepository(Setup_Go)
    private setupGoRepository: Repository<Setup_Go>,
  ) {}
  create(createSetupGoDto: SetupGoDto) {
    const newSetupGo = this.setupGoRepository.create(createSetupGoDto);
    return this.setupGoRepository.save(newSetupGo);
  }

  findAll() {
    return this.setupGoRepository.find();
  }

  findOne(id: number) {
    return this.setupGoRepository.findOneBy({ setup_go_id: id });
  }

  update(id: number, updateSetupGoDto: SetupGoDto) {
    return this.setupGoRepository.update(id, updateSetupGoDto);
  }

  remove(id: number) {
    return this.setupGoRepository.delete(id);
  }
}
