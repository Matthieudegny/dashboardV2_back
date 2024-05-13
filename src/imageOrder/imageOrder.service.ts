import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImageOrderDto } from './dto/imageOrder.dto';
import { Image_Order } from '../entities/image/ImageOrder';

@Injectable()
export class ImageOrderService {
  constructor(
    @InjectRepository(Image_Order)
    private imageOrderRepository: Repository<Image_Order>,
  ) {}
  async create(imageOrderDto: ImageOrderDto): Promise<ImageOrderDto> {
    try {
      const newImageGo = this.imageOrderRepository.create(imageOrderDto);
      return this.imageOrderRepository.save(newImageGo);
    } catch (error) {
      throw new Error(error);
    }
  }

  findAll() {
    return this.imageOrderRepository.find();
  }

  findAllByOrderId(orderId: number) {
    return this.imageOrderRepository.find({
      where: { imageOrder_order_id: orderId },
    });
  }

  findImageOrderById(id: number) {
    return this.imageOrderRepository.findOneBy({ imageOrder_id: id });
  }

  async update(updateImageGoDto: ImageOrderDto): Promise<boolean> {
    try {
      const response = await this.imageOrderRepository.update(
        updateImageGoDto.imageOrder_id,
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
      const imgaeIsdelete = await this.imageOrderRepository.delete(id);
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
