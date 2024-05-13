import { Module } from '@nestjs/common';
import { ImageSubOrderService } from './imageSubOrder.service';
import { ImageSubOrderController } from './imageSubOrder.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image_SubOrder } from '../entities/image/ImageSubOrder';

@Module({
  imports: [TypeOrmModule.forFeature([Image_SubOrder])],
  controllers: [ImageSubOrderController],
  providers: [ImageSubOrderService],
  exports: [ImageSubOrderService],
})
export class ImageSubOrderModule {}
