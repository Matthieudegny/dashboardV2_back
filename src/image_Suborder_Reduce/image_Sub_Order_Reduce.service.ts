import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image_Suborder_ReduceDto } from './dto/image_suborder_reduce.dto';
import { Image_Suborder_Reduce } from '../entities/image/Image_Suborder_Reduce';

@Injectable()
export class Image_Suborder_Reduce_Service {
  constructor(
    @InjectRepository(Image_Suborder_Reduce)
    private imageSubOrderRepository: Repository<Image_Suborder_Reduce>,
  ) {}
  create(
    createImageSoDto: Image_Suborder_ReduceDto,
  ): Promise<Image_Suborder_Reduce> {
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
        where: { image_Suborder_reduce_subOrder_reduce_id: subOrderId },
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
      image_Suborder_reduce_id: id,
    });
  }

  async update(updateImageGoDto: Image_Suborder_ReduceDto): Promise<boolean> {
    try {
      const response = await this.imageSubOrderRepository.update(
        updateImageGoDto.image_Suborder_reduce_id,
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
