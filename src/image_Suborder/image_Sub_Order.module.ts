import { Module } from '@nestjs/common';
import { Image_Suborder_Service } from './image_Sub_Order.service';
import { Image_Suborder_Controller } from './image_Sub_Order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image_Suborder } from '../entities/image/Image_Suborder';

@Module({
  imports: [TypeOrmModule.forFeature([Image_Suborder])],
  controllers: [Image_Suborder_Controller],
  providers: [Image_Suborder_Service],
  exports: [Image_Suborder_Service],
})
export class Image_Suborder_Module {}
