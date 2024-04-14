import { Module } from '@nestjs/common';
import { ImageOrderService } from './imageOrder.service';
import { ImageOrderController } from './imageOrder.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image_Go } from '../entities/image/ImageOrder';

@Module({
  imports: [TypeOrmModule.forFeature([Image_Go])],
  controllers: [ImageOrderController],
  providers: [ImageOrderService],
  exports: [ImageOrderService],
})
export class ImageOrderModule {}
