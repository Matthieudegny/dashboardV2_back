import { Injectable } from '@nestjs/common';
import { CreateImageSoDto } from './dto/create-image_so.dto';
import { UpdateImageSoDto } from './dto/update-image_so.dto';

@Injectable()
export class ImageSoService {
  create(createImageSoDto: CreateImageSoDto) {
    return 'This action adds a new imageSo';
  }

  findAll() {
    return `This action returns all imageSo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} imageSo`;
  }

  update(id: number, updateImageSoDto: UpdateImageSoDto) {
    return `This action updates a #${id} imageSo`;
  }

  remove(id: number) {
    return `This action removes a #${id} imageSo`;
  }
}
