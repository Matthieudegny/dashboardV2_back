import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImageSubOrderDto } from './dto/image_so.dto';
import { Image_SubOrder } from '../entities/image/ImageSubOrder';

@Injectable()
export class ImageSubOrderService {
  constructor(
    @InjectRepository(Image_SubOrder)
    private imageSubOrderRepository: Repository<Image_SubOrder>,
  ) {}
  create(createImageSoDto: ImageSubOrderDto): Promise<Image_SubOrder> {
    try {
      const newImageSo = this.imageSubOrderRepository.create(createImageSoDto);
      return this.imageSubOrderRepository.save(newImageSo);
    } catch (error) {
      throw new Error(error);
    }
  }

  findAll() {
    return this.imageSubOrderRepository.find();
  }

  async findAllBySubOrderId(subOrderId: number) {
    try {
      const result = await this.imageSubOrderRepository.find({
        where: { imageSubOrder_subOrder_id: subOrderId },
      });
      if (result) {
        return result;
      } else {
        throw new Error('No image found');
      }
    } catch (error) {
      console.log('error', error);
      throw new Error('No image found');
    }
  }

  findOne(id: number) {
    return this.imageSubOrderRepository.findOneBy({ imageSubOrder_id: id });
  }

  update(id: number, updateImageSoDto: ImageSubOrderDto) {
    return this.imageSubOrderRepository.update(id, updateImageSoDto);
  }
  async remove(id: number): Promise<boolean> {
    try {
      const imgaeIsdelete = await this.imageSubOrderRepository.delete(id);
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
