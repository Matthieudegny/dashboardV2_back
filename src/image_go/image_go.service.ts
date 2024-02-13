import { Injectable } from '@nestjs/common';
import { CreateImageGoDto } from './dto/create-image_go.dto';
import { UpdateImageGoDto } from './dto/update-image_go.dto';

@Injectable()
export class ImageGoService {
  create(createImageGoDto: CreateImageGoDto) {
    return 'This action adds a new imageGo';
  }

  findAll() {
    return `This action returns all imageGo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} imageGo`;
  }

  update(id: number, updateImageGoDto: UpdateImageGoDto) {
    return `This action updates a #${id} imageGo`;
  }

  remove(id: number) {
    return `This action removes a #${id} imageGo`;
  }
}
