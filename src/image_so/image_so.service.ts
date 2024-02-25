import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImageSoDto } from './dto/image_so.dto';
import { Image_So } from '../entities/image/Image_so';

@Injectable()
export class ImageSoService {
  constructor(
    @InjectRepository(Image_So)
    private imageSoRepository: Repository<Image_So>,
  ) {}
  create(createImageSoDto: ImageSoDto) {
    const newImageSo = this.imageSoRepository.create(createImageSoDto);
    return this.imageSoRepository.save(newImageSo);
  }

  findAll() {
    return this.imageSoRepository.find();
  }

  findAllBySubOrderId(globalOrderId: number) {
    return this.imageSoRepository.find({
      where: { image_so_id: globalOrderId },
    });
  }

  findOne(id: number) {
    return this.imageSoRepository.findOneBy({ image_so_id: id });
  }

  update(id: number, updateImageSoDto: ImageSoDto) {
    return this.imageSoRepository.update(id, updateImageSoDto);
  }

  remove(id: number) {
    return this.imageSoRepository.delete(id);
  }
}
