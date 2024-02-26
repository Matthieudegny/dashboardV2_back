import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImageGoDto } from './dto/image_go.dto';
import { Image_Go } from '../entities/image/Image_go';

@Injectable()
export class ImageGoService {
  constructor(
    @InjectRepository(Image_Go)
    private imageGoRepository: Repository<Image_Go>,
  ) {}
  create(createImageGoDto: ImageGoDto) {
    const newImageGo = this.imageGoRepository.create(createImageGoDto);
    return this.imageGoRepository.save(newImageGo);
  }

  findAll() {
    return this.imageGoRepository.find();
  }

  findAllByGlobalOrderId(globalOrderId: number) {
    console.log('globalOrderId', globalOrderId);
    return this.imageGoRepository.find();
    // return this.imageGoRepository.find({
    //   where: { image_go_go_id: globalOrderId },
    // });
  }

  findOne(id: number) {
    return this.imageGoRepository.findOneBy({ image_go_id: id });
  }

  update(id: number, updateImageGoDto: ImageGoDto) {
    return this.imageGoRepository.update(id, updateImageGoDto);
  }

  remove(id: number) {
    return this.imageGoRepository.delete(id);
  }
}
