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
  create(createImageSoDto: ImageSoDto): Promise<ImageSoDto> {
    try {
      const newImageSo = this.imageSoRepository.create(createImageSoDto);
      return this.imageSoRepository.save(newImageSo);
    } catch (error) {
      throw new Error(error);
    }
  }

  findAll() {
    return this.imageSoRepository.find();
  }

  async findAllBySubOrderId(globalOrderId: number) {
    console.log('globalSubOrderId', globalOrderId);
    try {
      const result = await this.imageSoRepository.find({
        where: { image_so_so_id: globalOrderId },
      });
      if (result) {
        return result;
      } else {
        throw new Error('No image found');
      }
    } catch (error) {
      throw new Error('No image found');
      console.log('error', error);
    }
  }

  findOne(id: number) {
    return this.imageSoRepository.findOneBy({ image_so_id: id });
  }

  update(id: number, updateImageSoDto: ImageSoDto) {
    return this.imageSoRepository.update(id, updateImageSoDto);
  }

  async remove(id: number): Promise<boolean> {
    try {
      const imgaeIsdelete = await this.imageSoRepository.delete(id);
      if (imgaeIsdelete.affected === 0) {
        throw new Error('Image is not found');
      } else {
        return true;
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}
