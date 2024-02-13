import { Module } from '@nestjs/common';
import { ImageGoService } from './image_go.service';
import { ImageGoController } from './image_go.controller';

@Module({
  controllers: [ImageGoController],
  providers: [ImageGoService],
})
export class ImageGoModule {}
