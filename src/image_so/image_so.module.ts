import { Module } from '@nestjs/common';
import { ImageSoService } from './image_so.service';
import { ImageSoController } from './image_so.controller';

@Module({
  controllers: [ImageSoController],
  providers: [ImageSoService],
})
export class ImageSoModule {}
