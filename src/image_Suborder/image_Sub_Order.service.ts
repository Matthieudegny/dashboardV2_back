import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image_SuborderDto } from './dto/image_suborder.dto';
import { Image_Suborder } from '../entities/image/Image_Suborder';

@Injectable()
export class Image_Suborder_Service {
  constructor(
    @InjectRepository(Image_Suborder)
    private imageSubOrderRepository: Repository<Image_Suborder>,
  ) {}
  create(createImageSoDto: Image_SuborderDto): Promise<Image_Suborder> {
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
        where: { image_Suborder_subOrder_id: subOrderId },
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
    return this.imageSubOrderRepository.findOneBy({
      image_Suborder_id: id,
    });
  }

  async update(updateImageGoDto: Image_SuborderDto): Promise<boolean> {
    try {
      const response = await this.imageSubOrderRepository.update(
        updateImageGoDto.image_Suborder_id,
        updateImageGoDto,
      );
      if (response.affected === 0) {
        throw new Error('Image is not found');
      } else {
        return true;
      }
    } catch (error) {
      throw new Error(error);
    }
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
