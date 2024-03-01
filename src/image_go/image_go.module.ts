import { Module } from '@nestjs/common';
import { ImageGoService } from './image_go.service';
import { ImageGoController } from './image_go.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image_Go } from '../entities/image/Image_go';

@Module({
  imports: [TypeOrmModule.forFeature([Image_Go])],
  controllers: [ImageGoController],
  providers: [ImageGoService],
  exports: [ImageGoService],
})
export class ImageGoModule {}
